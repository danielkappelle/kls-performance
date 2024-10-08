import { getAirframeByReg } from "@/actions/db/airframe";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { table } from "console";

export default async function AirframePage({
  params,
}: {
  params: { registration: string };
}) {
  const airframe = await getAirframeByReg(params.registration);
  return (
    <>
      <h2 className="text-2xl font-bold tracking-tight">
        {params.registration}
      </h2>
      <p className="text-muted-foreground">{airframe.type}</p>
      {getPerfTable(
        airframe.perfTakeOff,
        "Take-Off Distance - Normal Procedure - 1999 kg / 4407 lb"
      )}
      {getPerfTable(
        airframe.perfLanding,
        "Landing Distance - Flaps LDG - 1999 kg / 4407 lb"
      )}
      {getPerfTable(
        airframe.perfLandingFlapless,
        "Landing Distance - Abnormal Flap Position - 1999 kg / 4407 lb"
      )}
    </>
  );
}

function getPerfTable(table: string | null, title: string) {
  return (
    <Table className="border-collapse border text-center mt-3">
      <TableHeader className="text-center">
        <TableRow>
          <TableHead className="border" colSpan={8}>
            {title}
          </TableHead>
        </TableRow>
        <TableRow>
          <TableHead className="border">Press. Alt.</TableHead>
          <TableHead className="border">Distance</TableHead>
          <TableHead className="border" colSpan={6}>
            Outside Air Temperature - [ºC] / [ºF]
          </TableHead>
        </TableRow>
        <TableRow>
          <TableHead className="border">[ft] / [m]</TableHead>
          <TableHead className="border">[m]</TableHead>
          <TableHead className="border">0 / 32</TableHead>
          <TableHead className="border">10 / 50</TableHead>
          <TableHead className="border">20 / 68</TableHead>
          <TableHead className="border">30 / 86</TableHead>
          <TableHead className="border">40 / 104</TableHead>
          <TableHead className="border">50 / 122</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{getRows(table)}</TableBody>
    </Table>
  );
}

function getRows(tableString: string | null) {
  if (!tableString || !tableString.length) return null;
  let table: number[];
  try {
    table = JSON.parse(tableString);
  } catch {
    return null;
  }

  const n = table.length;
  const nRows = Math.round(n / 12);
  console.log(n);

  const dom = [];

  for (let i = 0; i < nRows; i++) {
    dom.push(
      <>
        <TableRow>
          <TableCell rowSpan={2}>{i === 0 ? "SL" : i * 1000}</TableCell>
          <TableCell>Ground Roll</TableCell>
          {table.slice(i * 12, i * 12 + 6).map((cell, idx) => (
            <TableCell key={idx}>{cell}</TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCell>15 m / 50 ft</TableCell>
          {table.slice(i * 12 + 6, i * 12 + 12).map((cell, idx) => (
            <TableCell key={idx}>{cell}</TableCell>
          ))}
        </TableRow>
      </>
    );
  }
  return dom;
}
