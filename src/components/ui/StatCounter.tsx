import React, { useEffect, useState } from "react";

interface StatCounterProps {
  value: string | number;
  className?: string;
  duration?: number; // Animation duration in ms
}

export const StatCounter: React.FC<StatCounterProps> = ({
  value,
  className = "",
  duration = 1200,
}) => {
  const [displayValue, setDisplayValue] = useState<string>(String(value));

  useEffect(() => {
    const rawStr = String(value);

    // Extract prefix, number string, and suffix
    // Matches patterns like "+24.8%", "112,500", "820+", "14.2k", "$342"
    const match = rawStr.match(/^([^\d.]*)([\d,.]+)(.*)$/);

    if (!match) {
      setDisplayValue(rawStr);
      return;
    }

    const [, prefix, numStr, suffix] = match;
    const cleanNumStr = numStr.replace(/,/g, "");
    const targetNum = parseFloat(cleanNumStr);

    if (isNaN(targetNum)) {
      setDisplayValue(rawStr);
      return;
    }

    // Determine decimal places
    const decimalParts = cleanNumStr.split(".");
    const decimals = decimalParts.length > 1 ? decimalParts[1].length : 0;
    const hasCommas = numStr.includes(",");

    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // Ease out cubic function for smooth slowing down at the end
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentNum = targetNum * easeOut;

      let formattedNum = currentNum.toFixed(decimals);

      if (hasCommas) {
        const parts = formattedNum.split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        formattedNum = parts.join(".");
      }

      setDisplayValue(`${prefix}${formattedNum}${suffix}`);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        // Ensure exact final string matches target
        setDisplayValue(rawStr);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [value, duration]);

  return (
    <span className={`inline-block font-sans ${className}`}>
      {displayValue}
    </span>
  );
};
