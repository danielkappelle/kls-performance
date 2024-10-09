import { TCondition } from "@/components/briefing/briefing-state";
import { AirframeSelect } from "@/db/schema";

export type TPerformancetable = {
  roll: number;
  dist: number;
  windCorrectionPercent: number;
  windCorrectionRoll: number;
  windCorrectionDist: number;
  subTotalRoll: number;
  subTotalDist: number;
  conditionCorrectionPercent: number;
  conditionCorrectionRoll: number;
  conditionCorrectionDist: number;
  totalRoll: number;
  totalDist: number;
};

export type TTableValues = {
  takeOff: {
    roll: number;
    dist: number;
  };
  landing: {
    roll: number;
    dist: number;
  };
  landingFlapless: {
    roll: number;
    dist: number;
  };
};

const emptyTable = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];

export const emptyPerformance: TTableValues = {
  takeOff: {
    roll: 0,
    dist: 0,
  },
  landing: {
    roll: 0,
    dist: 0,
  },
  landingFlapless: {
    roll: 0,
    dist: 0,
  },
};

function getTempIndex(temp: number): number {
  if (temp < 5) return 0;
  else if (temp >= 5 && temp < 15) return 1;
  else if (temp >= 15 && temp < 25) return 2;
  else if (temp >= 25 && temp < 35) return 3;
  else if (temp >= 35 && temp < 45) return 4;
  else return 5;
}

function getParsedTable(table: string | null): number[] {
  if (!table || !table.length) return emptyTable;
  let tableArray: number[];
  try {
    tableArray = JSON.parse(table);
  } catch {
    return emptyTable;
  }
  return tableArray;
}

export function getValueFromTable(
  airframe: AirframeSelect | undefined,
  pressureAltitude: number,
  temp: number
): TTableValues {
  if (!airframe) return emptyPerformance;

  const tempIndex = getTempIndex(temp);
  const paIndex = pressureAltitude <= 0 ? 0 : 1;

  const takeOffTable = getParsedTable(airframe.perfTakeOff);
  const landingTable = getParsedTable(airframe.perfLanding);
  const landingFlaplessTable = getParsedTable(airframe.perfLandingFlapless);

  const parsedTable = emptyPerformance;

  parsedTable.takeOff.roll = takeOffTable[paIndex * 12 + tempIndex];
  parsedTable.takeOff.dist = takeOffTable[paIndex * 12 + tempIndex + 6];
  parsedTable.landing.roll = landingTable[paIndex * 12 + tempIndex];
  parsedTable.landing.dist = landingTable[paIndex * 12 + tempIndex + 6];
  parsedTable.landingFlapless.roll =
    landingFlaplessTable[paIndex * 12 + tempIndex];
  parsedTable.landingFlapless.dist =
    landingFlaplessTable[paIndex * 12 + tempIndex + 6];

  return parsedTable;
}

function getWindCorrection(hw: number) {
  if (hw < 0) {
    return (hw / 3) * 10;
  } else {
    return (hw / 14) * 10;
  }
}

export function getPerformance(
  phase: "takeOff" | "landing" | "landingFlapless",
  table: TTableValues,
  hw: number,
  condition: TCondition,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  slope: number
): TPerformancetable {
  let roll, dist: number;
  if (phase === "takeOff") {
    roll = table.takeOff.roll;
    dist = table.takeOff.dist;
  } else if (phase === "landing") {
    roll = table.landing.roll;
    dist = table.landing.dist;
  } else {
    roll = table.landingFlapless.roll;
    dist = table.landingFlapless.dist;
  }

  const windCorrectionPercent = getWindCorrection(hw);
  const windCorrectionRoll = (windCorrectionPercent / 100) * roll;
  const windCorrectionDist = (windCorrectionPercent / 100) * dist;

  const subTotalRoll = roll - windCorrectionRoll;
  const subTotalDist = dist - windCorrectionDist;

  const conditionCorrectionPercent =
    condition === "dry" ? 0 : phase === "takeOff" ? 10 : 15;
  const conditionCorrectionRoll = (conditionCorrectionPercent / 100) * roll;
  const conditionCorrectionDist = (conditionCorrectionPercent / 100) * dist;

  // TODO Slope?

  const totalRoll = subTotalRoll + conditionCorrectionRoll;
  const totalDist = subTotalDist + conditionCorrectionDist;

  return {
    roll,
    dist,
    windCorrectionPercent,
    windCorrectionRoll,
    windCorrectionDist,
    subTotalRoll,
    subTotalDist,
    conditionCorrectionPercent,
    conditionCorrectionRoll,
    conditionCorrectionDist,
    totalRoll,
    totalDist,
  };
}
