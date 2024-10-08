"use client";

import { AerodromeSelect, AirframeSelect, RunwaySelect } from "@/db/schema";
import { createContext, Dispatch, useContext, useReducer } from "react";

export type TCondition = "wet" | "dry";

export interface TBriefing {
  airframe?: AirframeSelect;
  date?: Date;
  pic?: string;
  columns: TColumnState[];
}

export interface TColumnState {
  name: string;
  aerodrome?: AerodromeSelect;
  runway?: RunwaySelect;
  condition?: TCondition;
  windDir?: number;
  windKts?: number;
  qnh?: number;
  temp?: number;
  takeOffRoll?: number;
  takeOffDist?: number;
  pressureAltitude?: number;
  headWind?: number;
}

export interface TAction {
  type: string;
  payload: any;
  columnIdx?: number;
}

const initialBriefing: TBriefing = {
  date: new Date(),
  pic: "KLMFA",
  columns: [
    { name: "Departure", qnh: 1013 },
    { name: "Destination", qnh: 1013 },
    { name: "Alternate", qnh: 1013 },
  ],
};

const BriefingContext = createContext<TBriefing>(initialBriefing);
const BriefingDispatchContext = createContext<Dispatch<TAction>>(() => null);

export function BriefingProvider({ children }: { children: React.ReactNode }) {
  const [briefing, dispatch] = useReducer(briefingReducer, initialBriefing);

  return (
    <BriefingContext.Provider value={briefing}>
      <BriefingDispatchContext.Provider value={dispatch}>
        {children}
      </BriefingDispatchContext.Provider>
    </BriefingContext.Provider>
  );
}

export function useBriefing() {
  return useContext(BriefingContext);
}

export function useBriefingDispatch() {
  return useContext(BriefingDispatchContext);
}

function briefingReducer(briefing: TBriefing, action: TAction): TBriefing {
  switch (action.type) {
    case "setBriefingDate": {
      return {
        ...briefing,
        date: action.payload as Date,
      };
    }
    case "setAirframe": {
      return {
        ...briefing,
        airframe: action.payload as AirframeSelect,
      };
    }
    case "setPic": {
      return {
        ...briefing,
        pic: action.payload as string,
      };
    }
    case "setAerodrome": {
      return {
        ...briefing,
        columns: briefing.columns.map((col, idx) => {
          if (idx === action.columnIdx) {
            return { ...col, aerodrome: action.payload as AerodromeSelect };
          } else {
            return col;
          }
        }),
      };
    }

    case "setRunway": {
      return {
        ...briefing,
        columns: briefing.columns.map((col, idx) => {
          if (idx === action.columnIdx) {
            return { ...col, runway: action.payload as RunwaySelect };
          } else {
            return col;
          }
        }),
      };
    }
    case "setCondition": {
      return {
        ...briefing,
        columns: briefing.columns.map((col, idx) => {
          if (idx === action.columnIdx) {
            return { ...col, condition: action.payload as TCondition };
          } else {
            return col;
          }
        }),
      };
    }
    case "setWindDir": {
      return {
        ...briefing,
        columns: briefing.columns.map((col, idx) => {
          if (idx === action.columnIdx) {
            return { ...col, windDir: action.payload as number };
          } else {
            return col;
          }
        }),
      };
    }
    case "setWindKts": {
      return {
        ...briefing,
        columns: briefing.columns.map((col, idx) => {
          if (idx === action.columnIdx) {
            return { ...col, windKts: action.payload as number };
          } else {
            return col;
          }
        }),
      };
    }

    case "setQnh": {
      return {
        ...briefing,
        columns: briefing.columns.map((col, idx) => {
          if (idx === action.columnIdx) {
            return { ...col, qnh: action.payload as number };
          } else {
            return col;
          }
        }),
      };
    }
    case "setTemp": {
      return {
        ...briefing,
        columns: briefing.columns.map((col, idx) => {
          if (idx === action.columnIdx) {
            return { ...col, temp: action.payload as number };
          } else {
            return col;
          }
        }),
      };
    }
    default: {
      console.error("Unknown action: " + action.type);
    }
  }
}
