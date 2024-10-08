import { getAirframes } from "@/actions/db/airframe";
import { SidebarNav } from "@/components/airframes/airframes";

export default async function AirframesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const airframes = await getAirframes();
  return (
    <div className="hidden space-y-6 p-10 pb-16 md:block">
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav airframes={airframes} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
}
