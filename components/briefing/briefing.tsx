"use client";
import { AerodromeSelect, AirframeSelect } from "@/db/schema";
import BriefingColumn from "./briefing-column";
import BriefingDetails from "./briefing-details";
import { BriefingProvider } from "./briefing-state";

export default function BriefingComponent({
  airframes,
  aerodromes,
}: {
  airframes: AirframeSelect[];
  aerodromes: AerodromeSelect[];
}) {
  return (
    <BriefingProvider>
      <div className="container mx-auto my-5">
        <div className="flex flex-row gap-4 items-start">
          <BriefingDetails airframes={airframes} />
          <BriefingColumn aerodromes={aerodromes} />
        </div>
      </div>
    </BriefingProvider>
  );
}
