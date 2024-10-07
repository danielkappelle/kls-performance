import { InferSelectModel, relations } from "drizzle-orm";
import {
  bigint,
  float,
  mysqlEnum,
  mysqlTable,
  varchar,
} from "drizzle-orm/mysql-core";

export const Airframe = mysqlTable("airframe", {
  id: bigint("id", { mode: "number", unsigned: true })
    .autoincrement()
    .primaryKey(),
  registration: varchar("registration", { length: 10 }).unique().notNull(),
  type: varchar("type", { length: 10 }),
  perfTakeOff: varchar("perf_take_off", { length: 1000 }),
  perfLanding: varchar("perf_landing", { length: 1000 }),
  perfLandingFlapless: varchar("perf_landing_flapless", { length: 1000 }),
});

export const Aerodrome = mysqlTable("aerodrome", {
  id: bigint("id", { mode: "number", unsigned: true })
    .autoincrement()
    .primaryKey(),
  icaoCode: varchar("icao_code", { length: 4 }).unique().notNull(),
  name: varchar("name", { length: 100 }),
  elevation: float("elevation"),
});

export const Runway = mysqlTable("runway", {
  id: bigint("id", { mode: "number", unsigned: true })
    .autoincrement()
    .primaryKey(),
  code: varchar("code", { length: 3 }),
  aerodromeId: bigint("airportId", { mode: "number", unsigned: true }),
  direction: float("direction"),
  surface: mysqlEnum("surface_type", ["asphalt", "grass"]),
  slope: float("slope"),
  tora: float("tora"),
  toda: float("toda"),
  lda: float("lda"),
});

export const AerodromeRelations = relations(Aerodrome, ({ many }) => ({
  runways: many(Runway),
}));

export const RunwayRelations = relations(Runway, ({ one }) => ({
  aerodrome: one(Aerodrome, {
    fields: [Runway.aerodromeId],
    references: [Aerodrome.id],
  }),
}));

export type AirframeSelect = InferSelectModel<typeof Airframe>;
export type AerodromeSelect = InferSelectModel<typeof Aerodrome>;
export type RunwaySelect = InferSelectModel<typeof Runway>;
