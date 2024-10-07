import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2";

if (!process.env.DB_URL) {
  throw new Error("DB Credentials Error");
}

let db: ReturnType<typeof drizzle> | null = null;

export const getDb = () => {
  if (db) return db;
  const connection = mysql.createPool(process.env.DB_URL!);
  db = drizzle(connection);
  return db;
};
