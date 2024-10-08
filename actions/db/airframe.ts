"use server";
import { getDb } from "@/db/drizzle";
import { Airframe } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getAirframes = async () => {
  const data = await getDb().select().from(Airframe);
  return data;
};

export const getAirframeByReg = async (registration: string) => {
  const data = await getDb()
    .select()
    .from(Airframe)
    .where(eq(Airframe.registration, registration));
  return data[0];
};
