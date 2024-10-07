"use server";
import { getDb } from "@/db/drizzle";
import { Aerodrome } from "@/db/schema";

export const getAerodromes = async () => {
  const data = await getDb().select().from(Aerodrome);
  return data;
};
