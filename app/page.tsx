import { getAerodromes } from "@/actions/db/aerodrome";
import { getAirframes } from "@/actions/db/airframe";
import { getRunways } from "@/actions/db/runway";
import BriefingColumn from "@/components/briefing/briefing-column";
import BriefingDetails from "@/components/briefing/briefing-details";

export default async function HomePage() {
  const airframes = await getAirframes();
  const aerodromes = await getAerodromes();
  const runways = await getRunways();

  return (
    <div className="container mx-auto my-5">
      <div className="flex flex-row gap-4 items-start">
        <BriefingDetails airframes={airframes} />
        <BriefingColumn aerodromes={aerodromes} />
      </div>
    </div>
  );
}
