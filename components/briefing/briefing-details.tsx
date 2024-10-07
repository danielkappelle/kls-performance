"use client";

import { exportExcel } from "@/actions/export";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { Input } from "@/components/ui/input";
import { AirframeSelect } from "@/db/schema";

export default function BriefingDetails({
  airframes,
}: {
  airframes: AirframeSelect[];
}) {
  const [date, setDate] = React.useState<Date>();

  const onExport = async () => {
    const buf = await exportExcel();

    const buffer = Buffer.from(buf);
    const blob = new Blob([buffer]);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.download = "performance.xlsx";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Briefing details</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="airframe">Airframe</Label>
              <Select>
                <SelectTrigger id="airframe">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {airframes.map((airframe) => (
                    <SelectItem value={airframe.registration} key={airframe.id}>
                      {airframe.registration}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="pic">Pilot in command / student</Label>
              <Input type="text" id="pic" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button onClick={onExport}>Export</Button>
      </CardFooter>
    </Card>
  );
}
