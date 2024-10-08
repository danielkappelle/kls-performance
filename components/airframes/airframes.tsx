"use client";
import { buttonVariants } from "@/components/ui/button";
import { AirframeSelect } from "@/db/schema";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Airframes({
  airframes,
}: {
  airframes: AirframeSelect[];
}) {}

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  airframes: AirframeSelect[];
}

export function SidebarNav({
  className,
  airframes,
  ...props
}: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {airframes.map((airframe) => (
        <Link
          key={airframe.id}
          href={`/airframes/${airframe.registration}`}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === `/airframes/${airframe.registration}`
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {airframe.registration}
        </Link>
      ))}
    </nav>
  );
}
