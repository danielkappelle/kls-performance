"use client";
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
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function BriefingColumn() {
  const aerodromes = ["EHGG", "EHLE", "EHRD", "EDDW"];
  const runways = ["23", "05"];

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
                <Select>
                  <SelectTrigger id="airframe">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {aerodromes.map((ad) => (
                      <SelectItem value={ad} key={ad}>
                        {ad}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="runway">Runway</Label>
                <Select>
                  <SelectTrigger id="runway">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {runways.map((rw) => (
                      <SelectItem value={rw} key={rw}>
                        {rw}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="condition">Condition</Label>
              <Select>
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
                  <Input type="number" id="windDir" />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <div>
                  <Label htmlFor="windKts">Wind speed</Label>
                  <Input type="number" id="windKts" />
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <div>
                <Label htmlFor="temp">Temperature</Label>
                <Input type="number" id="temp" />
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <div>
                <Label htmlFor="qnh">QNH</Label>
                <Input type="number" id="qnh" />
              </div>
            </div>
          </form>
          <hr />
          <div className="flex flex-row justify-between">
            <Label>Runway direction</Label>
            <Label>123º</Label>
          </div>
          <div className="flex flex-row justify-between">
            <Label>Elevation</Label>
            <Label>150 ft</Label>
          </div>
          <div className="flex flex-row justify-between">
            <Label>Pressure altitude</Label>
            <Label>300 ft</Label>
          </div>
          <div className="flex flex-row justify-between">
            <Label>Surface</Label>
            <Label>Asphalt</Label>
          </div>
          <div className="flex flex-row justify-between">
            <Label>Condition</Label>
            <Label>Dry</Label>
          </div>
          <div className="flex flex-row justify-between">
            <Label>Headwind</Label>
            <Label>5 kts</Label>
          </div>
          <div className="flex flex-row justify-between">
            <Label>Slope</Label>
            <Label>0.1%</Label>
          </div>
          <div className="flex flex-row justify-between">
            <Label>TORA</Label>
            <Label>2500m</Label>
          </div>
          <div className="flex flex-row justify-between">
            <Label>TODA</Label>
            <Label>2500m</Label>
          </div>
          <div className="flex flex-row justify-between">
            <Label>LDA</Label>
            <Label>2500m</Label>
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
