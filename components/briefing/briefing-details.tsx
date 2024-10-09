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
import { useBriefing, useBriefingDispatch } from "./briefing-state";

export default function BriefingDetails({
  airframes,
}: {
  airframes: AirframeSelect[];
}) {
  const dispatch = useBriefingDispatch();
  const briefing = useBriefing();

  const onExport = async () => {
    const buf = await exportExcel(briefing);

    const buffer = Buffer.from(buf);
    const blob = new Blob([buffer]);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.setAttribute("style", "display:none");
    a.href = url;
    a.download = "performance.xlsx";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const setBriefingDate = (date: Date | undefined) => {
    dispatch({ type: "setBriefingDate", payload: date });
  };

  const setAirframe = (id: string) => {
    dispatch({
      type: "setAirframe",
      payload: airframes.find((a) => a.id === +id),
    });
  };

  const setPic = (pic: string) => {
    dispatch({ type: "setPic", payload: pic });
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
                      !briefing.date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {briefing.date ? (
                      format(briefing.date, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={briefing.date}
                    onSelect={setBriefingDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="airframe">Airframe</Label>
              <Select onValueChange={setAirframe}>
                <SelectTrigger id="airframe">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {airframes.map((airframe) => (
                    <SelectItem
                      value={airframe.id.toString()}
                      key={airframe.id}
                    >
                      {airframe.registration}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="pic">Pilot in command / student</Label>
              <Input
                type="text"
                id="pic"
                value={briefing.pic}
                onChange={(e) => setPic(e.target.value)}
              />
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
