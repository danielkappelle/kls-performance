"use server";
import { getDb } from "@/db/drizzle";
import { Airframe } from "@/db/schema";

export const getAirframes = async () => {
  const data = await getDb().select().from(Airframe);
  return data;
};
