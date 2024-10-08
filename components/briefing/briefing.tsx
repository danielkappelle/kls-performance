"use client";
import { AerodromeSelect, AirframeSelect } from "@/db/schema";
import BriefingColumn from "./briefing-column";
import BriefingDetails from "./briefing-details";
import { BriefingProvider, useBriefing } from "./briefing-state";

export default function BriefingComponent({
  airframes,
  aerodromes,
}: {
  airframes: AirframeSelect[];
  aerodromes: AerodromeSelect[];
}) {
  const briefing = useBriefing();

  return (
    <BriefingProvider>
      <div className="flex flex-row gap-4 items-start">
        <BriefingDetails airframes={airframes} />
        {briefing.columns.map((col, idx) => (
          <BriefingColumn columnIdx={idx} aerodromes={aerodromes} key={idx} />
        ))}
      </div>
    </BriefingProvider>
  );
}
