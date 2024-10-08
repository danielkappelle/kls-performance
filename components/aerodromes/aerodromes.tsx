"use client";
import { buttonVariants } from "@/components/ui/button";
import { AerodromeSelect } from "@/db/schema";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  aerodromes: AerodromeSelect[];
}

export function SidebarNav({
  className,
  aerodromes,
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
      {aerodromes.map((ad) => (
        <Link
          key={ad.id}
          href={`/aerodromes/${ad.icaoCode}`}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === `/aerodromes/${ad.icaoCode}`
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {ad.icaoCode}
        </Link>
      ))}
    </nav>
  );
}
