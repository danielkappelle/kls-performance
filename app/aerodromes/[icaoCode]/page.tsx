import { getAerodromeByIcaoCode } from "@/actions/db/aerodrome";
import { getRunways } from "@/actions/db/runway";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RunwaySelect } from "@/db/schema";

export default async function AerodromePage({
  params,
}: {
  params: { icaoCode: string };
}) {
  const aerodrome = await getAerodromeByIcaoCode(params.icaoCode);
  const runways = await getRunways(aerodrome.id);

  return (
    <>
      <h2 className="text-2xl font-bold tracking-tight">
        {aerodrome.icaoCode} - {aerodrome.name}
      </h2>
      <p className="text-muted-foreground">
        Elevation: {aerodrome.elevation} ft
      </p>
      {runways.map((rwy) => runwayInfo(rwy))}
    </>
  );
}

function runwayInfo(runway: RunwaySelect) {
  return (
    <div className="mt-3" key={runway.id}>
      <h2 className="text-md font-bold tracking-tight">{runway.code}</h2>
      <Table className="border-collapse border text-center mt-3">
        <TableHeader>
          <TableRow>
            <TableHead>Direction</TableHead>
            <TableHead>Surface</TableHead>
            <TableHead>Slope</TableHead>
            <TableHead>TORA</TableHead>
            <TableHead>TODA</TableHead>
            <TableHead>LDA</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{runway.direction}º</TableCell>
            <TableCell>{runway.surface}</TableCell>
            <TableCell>{runway.slope}%</TableCell>
            <TableCell>{runway.tora} m</TableCell>
            <TableCell>{runway.toda} m</TableCell>
            <TableCell>{runway.lda} m</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
