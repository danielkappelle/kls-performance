import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function deg2rad(x: number) {
  return (Math.PI / 180) * x;
}

export function rad2deg(x: number) {
  return x / (Math.PI / 180);
}
