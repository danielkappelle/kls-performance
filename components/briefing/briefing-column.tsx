"use client";
import { getAerodromes } from "@/actions/db/aerodrome";
import { getRunways } from "@/actions/db/runway";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AerodromeSelect, RunwaySelect } from "@/db/schema";
import { deg2rad } from "@/lib/utils";
import { useEffect, useState } from "react";
import { TCondition, useBriefing, useBriefingDispatch } from "./briefing-state";
import {
  emptyPerformance,
  getPerformance,
  getValueFromTable,
  TTableValues,
} from "@/lib/parse-table";
import { BriefingPerfTable } from "./briefing-perf-table";

export default function BriefingColumn({
  columnIdx,
  aerodromes,
}: {
  columnIdx: number;
  aerodromes: AerodromeSelect[];
}) {
  const dispatch = useBriefingDispatch();
  const briefing = useBriefing();

  // Setters
  const setAerodrome = (id: string) => {
    dispatch({
      type: "setAerodrome",
      columnIdx,
      payload: aerodromes.find((a) => a.id === +id),
    });
  };

  const setRunway = (id: string) => {
    dispatch({
      columnIdx,
      type: "setRunway",
      payload: runways.find((r) => r.id === +id),
    });
  };

  const setCondition = (condition: TCondition) => {
    dispatch({ columnIdx, type: "setCondition", payload: condition });
  };

  const setWindDir = (dir: number) => {
    dispatch({ columnIdx, type: "setWindDir", payload: dir });
  };

  const setWindKts = (kts: number) => {
    dispatch({ columnIdx, type: "setWindKts", payload: kts });
  };

  const setQnh = (qnh: number) => {
    dispatch({ columnIdx, type: "setQnh", payload: qnh });
  };

  const setTemp = (temp: number) => {
    dispatch({ columnIdx, type: "setTemp", payload: temp });
  };

  const [runways, setRunways] = useState<RunwaySelect[]>([]);

  useEffect(() => {
    if (!briefing.columns[columnIdx].aerodrome) return;
    setRunway("");
    getRunways(briefing.columns[columnIdx].aerodrome.id).then(setRunways);
  }, [briefing.columns[columnIdx].aerodrome]);

  const pa =
    (briefing.columns[columnIdx].aerodrome?.elevation || 0) +
    (1013 - (briefing.columns[columnIdx].qnh || 1013)) * 27;

  const hw =
    Math.cos(
      deg2rad(
        (briefing.columns[columnIdx].windDir || 0) -
          (briefing.columns[columnIdx].runway?.direction || 0)
      )
    ) * (briefing.columns[columnIdx].windKts || 0);

  const [perfValues, setPerfValues] = useState<TTableValues>(emptyPerformance);

  const perfTable = getValueFromTable(
    briefing.airframe,
    pa,
    briefing.columns[columnIdx].temp || 15
  );

  const takeOffTable = getPerformance(
    "takeOff",
    perfTable,
    hw,
    briefing.columns[columnIdx].condition || "dry",
    0
  );

  const landingTable = getPerformance(
    "landing",
    perfTable,
    hw,
    briefing.columns[columnIdx].condition || "dry",
    0
  );

  const landingFlaplessTable = getPerformance(
    "landingFlapless",
    perfTable,
    hw,
    briefing.columns[columnIdx].condition || "dry",
    0
  );

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{briefing.columns[columnIdx].name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <form>
            <div className="flex flex-row gap-2 w-full">
              <div className="flex flex-col space-y-1.5 flex-grow">
                <Label htmlFor="aerodrome">Aerodrome</Label>
                <Select onValueChange={setAerodrome}>
                  <SelectTrigger id="aerodrome">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {aerodromes.map((ad) => (
                      <SelectItem value={ad.id.toString()} key={ad.id}>
                        {ad.icaoCode}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="runway">Runway</Label>
                <Select onValueChange={setRunway}>
                  <SelectTrigger id="runway">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {runways.map((rw) => (
                      <SelectItem value={rw.id.toString()} key={rw.id}>
                        {rw.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="condition">Condition</Label>
              <Select onValueChange={setCondition}>
                <SelectTrigger id="condition">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="dry">Dry</SelectItem>
                  <SelectItem value="wet">Wet</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-row gap-2">
              <div className="flex flex-col space-y-1.5">
                <div>
                  <Label htmlFor="windDir">Wind direction</Label>
                  <Input
                    type="number"
                    id="windDir"
                    onChange={(e) => setWindDir(+e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <div>
                  <Label htmlFor="windKts">Wind speed</Label>
                  <Input
                    type="number"
                    id="windKts"
                    onChange={(e) => setWindKts(+e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <div>
                <Label htmlFor="temp">Temperature</Label>
                <Input
                  type="number"
                  id="temp"
                  onChange={(e) => setTemp(+e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <div>
                <Label htmlFor="qnh">QNH</Label>
                <Input
                  type="number"
                  id="qnh"
                  value={briefing.columns[columnIdx].qnh}
                  onChange={(e) => setQnh(+e.target.value)}
                />
              </div>
            </div>
          </form>
          <hr />
          <div className="flex flex-row justify-between">
            <Label>Runway direction</Label>
            <Label>{briefing.columns[columnIdx].runway?.direction}º</Label>
          </div>
          <div className="flex flex-row justify-between">
            <Label>Elevation</Label>
            <Label>{briefing.columns[columnIdx].aerodrome?.elevation} ft</Label>
          </div>
          <div className="flex flex-row justify-between">
            <Label>Pressure altitude</Label>
            <Label>{pa} ft</Label>
          </div>
          <div className="flex flex-row justify-between">
            <Label>Surface</Label>
            <Label>{briefing.columns[columnIdx].runway?.surface}</Label>
          </div>
          <div className="flex flex-row justify-between">
            <Label>{hw && hw < 0 ? "Tailwind" : "Headwind"} </Label>
            <Label>{Math.abs(hw || 0).toFixed(0)} kts</Label>
          </div>
          <div className="flex flex-row justify-between">
            <Label>Slope</Label>
            <Label>{briefing.columns[columnIdx].runway?.slope}%</Label>
          </div>
          <div className="flex flex-row justify-between">
            <Label>TORA</Label>
            <Label>{briefing.columns[columnIdx].runway?.tora} m</Label>
          </div>
          <div className="flex flex-row justify-between">
            <Label>TODA</Label>
            <Label>{briefing.columns[columnIdx].runway?.toda} m</Label>
          </div>
          <div className="flex flex-row justify-between">
            <Label>LDA</Label>
            <Label>{briefing.columns[columnIdx].runway?.lda} m</Label>
          </div>
          <hr />
          <BriefingPerfTable table={takeOffTable} tableTitle="Take-off" />
          <BriefingPerfTable table={landingTable} tableTitle="Landing" />
          <BriefingPerfTable
            table={landingFlaplessTable}
            tableTitle="Landing flapless"
          />
        </div>
      </CardContent>
    </Card>
  );
}
