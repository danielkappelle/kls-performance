"use client";

import { AerodromeSelect, AirframeSelect, RunwaySelect } from "@/db/schema";
import { createContext, Dispatch, useContext, useReducer } from "react";

export type TCondition = "wet" | "dry";

export interface TBriefing {
  airframe?: AirframeSelect;
  date?: Date;
  pic?: string;
  departureColumn: TColumnState;
}

export interface TColumnState {
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
}

const initialBriefing: TBriefing = {
  date: new Date(),
  pic: "KLMFA",
  departureColumn: {
    qnh: 1013,
  },
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
        departureColumn: {
          ...briefing.departureColumn,
          aerodrome: action.payload as AerodromeSelect,
        },
      };
    }
    case "setRunway": {
      return {
        ...briefing,
        departureColumn: {
          ...briefing.departureColumn,
          runway: action.payload as RunwaySelect,
        },
      };
    }
    case "setCondition": {
      return {
        ...briefing,
        departureColumn: {
          ...briefing.departureColumn,
          condition: action.payload as TCondition,
        },
      };
    }
    case "setWindDir": {
      return {
        ...briefing,
        departureColumn: {
          ...briefing.departureColumn,
          windDir: action.payload as number,
        },
      };
    }
    case "setWindKts": {
      return {
        ...briefing,
        departureColumn: {
          ...briefing.departureColumn,
          windKts: action.payload as number,
        },
      };
    }
    case "setQnh": {
      return {
        ...briefing,
        departureColumn: {
          ...briefing.departureColumn,
          qnh: action.payload as number,
        },
      };
    }
    case "setTemp": {
      return {
        ...briefing,
        departureColumn: {
          ...briefing.departureColumn,
          temp: action.payload as number,
        },
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
