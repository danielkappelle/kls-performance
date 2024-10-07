import BriefingColumn from "@/components/briefing/briefing-column";
import BriefingDetails from "@/components/briefing/briefing-details";

export default function HomePage() {
  return (
    <div className="container mx-auto my-5">
      <div className="flex flex-row gap-4 items-start">
        <BriefingDetails />
        <BriefingColumn />
      </div>
    </div>
  );
}
