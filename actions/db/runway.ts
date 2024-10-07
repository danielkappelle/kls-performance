"use server";
import { getDb } from "@/db/drizzle";
import { Runway } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getRunways = async (adId: number) => {
  const data = await getDb()
    .select()
    .from(Runway)
    .where(eq(Runway.aerodromeId, adId));
  return data;
};
