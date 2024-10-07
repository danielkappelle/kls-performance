import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";
config({ path: ".env.development" });
export default defineConfig({
  schema: "./db/schema.ts",
  out: "./migrations",
  dialect: "mysql",
  dbCredentials: {
    url: process.env.DB_URL!,
  },
});
