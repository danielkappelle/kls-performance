import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";

export default function Navbar() {
  const links = [
    {
      title: "Briefing",
      href: "/",
    },
    {
      title: "Airframes",
      href: "/airframes",
    },
    {
      title: "Aerodromes",
      href: "/aerodromes",
    },
    {
      title: "About",
      href: "/about",
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <nav className="hidden items-center gap-6  font-medium md:flex">
          <span>KLMFA Performance</span>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              {link.title}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full md:hidden"
              >
                <MenuIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="md:hidden">
              <div className="grid gap-4 p-4">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
