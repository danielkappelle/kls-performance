import { getAerodromes } from "@/actions/db/aerodrome";
import { getAirframes } from "@/actions/db/airframe";
import BriefingComponent from "@/components/briefing/briefing";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const airframes = await getAirframes();
  const aerodromes = await getAerodromes();

  return <BriefingComponent airframes={airframes} aerodromes={aerodromes} />;
}
