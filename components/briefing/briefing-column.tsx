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

export default function BriefingColumn({
  aerodromes,
}: {
  aerodromes: AerodromeSelect[];
}) {
  const [ad, setAd] = useState<AerodromeSelect>();
  const [runways, setRunways] = useState<RunwaySelect[]>([]);
  const [runway, setRunway] = useState<RunwaySelect>();
  const [condition, setCondition] = useState<string>();
  const [windDir, setWindDir] = useState<number>();
  const [windKts, setWindKts] = useState<number>();
  const [qnh, setQnh] = useState<number>(1013);
  const [temp, setTemp] = useState<number>();

  const [pa, setPa] = useState<number>();
  const [hw, setHw] = useState<number>();

  useEffect(() => {
    if (!ad) return;
    setRunway(null);
    getRunways(ad.id).then(setRunways);
  }, [ad]);

  useEffect(() => {
    // Pressure altitude
    setPa((ad?.elevation || 0) + (1013 - qnh) * 27);
    setHw(
      Math.cos(deg2rad((windDir || 0) - (runway?.direction || 0))) *
        (windKts || 0)
    );
  }, [condition, windDir, windKts, qnh, temp]);

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Departure</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <form>
            <div className="flex flex-row gap-2 w-full">
              <div className="flex flex-col space-y-1.5 flex-grow">
                <Label htmlFor="aerodrome">Aerodrome</Label>
                <Select
                  onValueChange={(id) =>
                    setAd(aerodromes.find((ad) => ad.id === +id))
                  }
                >
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
                <Select
                  onValueChange={(id) =>
                    setRunway(runways.find((rwy) => rwy.id === +id))
                  }
                >
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
              <Select onValueChange={(e) => setCondition(e)}>
                <SelectTrigger id="condition">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="Dry">Dry</SelectItem>
                  <SelectItem value="Wet">Wet</SelectItem>
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
                  value={qnh}
                  onChange={(e) => setQnh(+e.target.value)}
                />
              </div>
            </div>
          </form>
          <hr />
          <div className="flex flex-row justify-between">
            <Label>Runway direction</Label>
            <Label>{runway?.direction}º</Label>
          </div>
          <div className="flex flex-row justify-between">
            <Label>Elevation</Label>
            <Label>{ad?.elevation} ft</Label>
          </div>
          <div className="flex flex-row justify-between">
            <Label>Pressure altitude</Label>
            <Label>{pa} ft</Label>
          </div>
          <div className="flex flex-row justify-between">
            <Label>Surface</Label>
            <Label>{runway?.surface}</Label>
          </div>
          <div className="flex flex-row justify-between">
            <Label>{hw && hw < 0 ? "Tailwind" : "Headwind"} </Label>
            <Label>{Math.abs(hw || 0).toFixed(0)} kts</Label>
          </div>
          <div className="flex flex-row justify-between">
            <Label>Slope</Label>
            <Label>{runway?.slope}%</Label>
          </div>
          <div className="flex flex-row justify-between">
            <Label>TORA</Label>
            <Label>{runway?.tora} m</Label>
          </div>
          <div className="flex flex-row justify-between">
            <Label>TODA</Label>
            <Label>{runway?.toda} m</Label>
          </div>
          <div className="flex flex-row justify-between">
            <Label>LDA</Label>
            <Label>{runway?.lda} m</Label>
          </div>
          <hr />
          <Table className="border-collapse border">
            <TableHeader className="text-left">
              <TableRow>
                <TableHead className="border">Take-off</TableHead>
                <TableHead className="border">Cor %</TableHead>
                <TableHead className="border">Roll</TableHead>
                <TableHead className="border">Distance</TableHead>
              </TableRow>
            </TableHeader>
            <tbody>
              <TableRow>
                <TableCell>Basic</TableCell>
                <TableCell></TableCell>
                <TableCell>400</TableCell>
                <TableCell>660</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Wind</TableCell>
                <TableCell>8</TableCell>
                <TableCell>32</TableCell>
                <TableCell>52</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Subtotal</TableCell>
                <TableCell></TableCell>
                <TableCell>368</TableCell>
                <TableCell>608</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Surface / cont.</TableCell>
                <TableCell>15</TableCell>
                <TableCell>60</TableCell>
                <TableCell>99</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Slope</TableCell>
                <TableCell>0</TableCell>
                <TableCell>0</TableCell>
                <TableCell>0</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total in meters</TableCell>
                <TableCell></TableCell>
                <TableCell>428</TableCell>
                <TableCell>707</TableCell>
              </TableRow>
            </tbody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
