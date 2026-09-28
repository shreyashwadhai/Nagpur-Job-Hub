import React, { useRef, useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

interface HorizontalScrollerProps {
  children: React.ReactNode;
  speed?: number; // pixels per second for 60fps auto-scroll
}

export const HorizontalScroller: React.FC<HorizontalScrollerProps> = ({
  children,
  speed = 35, // 35px/sec gives a smooth, readable auto-scrolling speed
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const childrenArray = React.Children.toArray(children);
  // Duplicate children array to create an invisible infinite loop ribbon
  const duplicatedChildren = [...childrenArray, ...childrenArray];

  // 60FPS Infinite Loop Auto-Scroll using requestAnimationFrame
  useEffect(() => {
    let animationFrameId: number;
    let previousTime: number | null = null;

    const scrollStep = (time: number) => {
      if (previousTime !== null && !isHovered && !isMouseDown && scrollRef.current) {
        const deltaTime = (time - previousTime) / 1000; // seconds elapsed
        const movePx = speed * deltaTime;
        const container = scrollRef.current;

        container.style.scrollBehavior = 'auto';

        // Calculate half scroll width (1 full set of cards)
        const halfWidth = container.scrollWidth / 2;

        if (halfWidth > 0 && container.scrollLeft >= halfWidth) {
          // Seamlessly reset scroll position to the start set without visual jump
          container.scrollLeft -= halfWidth;
        } else {
          container.scrollLeft += movePx;
        }
      }

      previousTime = time;
      animationFrameId = requestAnimationFrame(scrollStep);
    };

    animationFrameId = requestAnimationFrame(scrollStep);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isHovered, isMouseDown, speed]);

  // Mouse Drag to Scroll Handlers with Infinite Loop Boundary Check
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsMouseDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
    setIsHovered(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    const container = scrollRef.current;
    container.style.scrollBehavior = 'auto';

    let newScrollLeft = scrollLeft - walk;
    const halfWidth = container.scrollWidth / 2;

    if (halfWidth > 0) {
      if (newScrollLeft >= halfWidth) {
        newScrollLeft -= halfWidth;
      } else if (newScrollLeft < 0) {
        newScrollLeft += halfWidth;
      }
    }

    container.scrollLeft = newScrollLeft;
  };

  // Button Smooth Navigation
  const scrollNav = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollAmount = container.clientWidth * 0.75;
    const halfWidth = container.scrollWidth / 2;

    container.style.scrollBehavior = 'smooth';

    if (direction === 'right' && container.scrollLeft >= halfWidth) {
      container.style.scrollBehavior = 'auto';
      container.scrollLeft -= halfWidth;
      setTimeout(() => {
        container.style.scrollBehavior = 'smooth';
        container.scrollBy({ left: scrollAmount });
      }, 20);
    } else {
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
      });
    }
  };

  return (
    <div
      className="relative group/scroller"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Navigation Arrow Buttons */}
      <button
        onClick={() => scrollNav('left')}
        aria-label="Scroll Left"
        className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 backdrop-blur-md border border-[#E5E9E6] shadow-lg flex items-center justify-center text-gray-700 hover:text-[#0B5D3B] hover:scale-110 transition-all opacity-0 group-hover/scroller:opacity-100 hidden sm:flex"
      >
        <Icon icon="solar:alt-arrow-left-bold" className="w-5 h-5" />
      </button>

      <button
        onClick={() => scrollNav('right')}
        aria-label="Scroll Right"
        className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 backdrop-blur-md border border-[#E5E9E6] shadow-lg flex items-center justify-center text-gray-700 hover:text-[#0B5D3B] hover:scale-110 transition-all opacity-0 group-hover/scroller:opacity-100 hidden sm:flex"
      >
        <Icon icon="solar:alt-arrow-right-bold" className="w-5 h-5" />
      </button>

      {/* Horizontal Scroller Track */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`flex items-stretch gap-6 overflow-x-auto pb-4 pt-1 px-1 scrollbar-none select-none ${
          isMouseDown ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {duplicatedChildren.map((child, index) => (
          <div key={index} className="flex-none w-[320px] sm:w-[360px] flex">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};
