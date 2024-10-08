"use server";
import { getDb } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { Aerodrome } from "@/db/schema";

export const getAerodromes = async () => {
  const data = await getDb().select().from(Aerodrome);
  return data;
};

export const getAerodromeByIcaoCode = async (icaoCode: string) => {
  const data = await getDb()
    .select()
    .from(Aerodrome)
    .where(eq(Aerodrome.icaoCode, icaoCode));
  return data[0];
};
