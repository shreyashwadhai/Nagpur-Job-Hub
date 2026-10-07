import React from "react";
import { mockIndustries } from "../../data/mockIndustries";
import { IndustryCard } from "../../components/ui/Cards";
import { PageHeader } from "../../components/common/PageHeader";

export const IndustryDirectory: React.FC = () => {
  return (
    <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-8">
      <PageHeader
        title="Nagpur Industry Directory"
        subtitle="Sector-by-sector breakdown of Nagpur’s key growth drivers spanning IT software, defence, EV, manufacturing, logistics, and data centers."
        badge="Sector Intelligence"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockIndustries.map((ind, idx) => (
          <IndustryCard key={ind.id} industry={ind} index={idx} />
        ))}
      </div>
    </div>
  );
};
