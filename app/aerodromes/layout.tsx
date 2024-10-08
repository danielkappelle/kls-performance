import { getAerodromes } from "@/actions/db/aerodrome";
import { SidebarNav } from "@/components/aerodromes/aerodromes";

export default async function AerodromesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const aerodromes = await getAerodromes();

  return (
    <div className="hidden space-y-6 p-10 pb-16 md:block">
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav aerodromes={aerodromes} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
}
