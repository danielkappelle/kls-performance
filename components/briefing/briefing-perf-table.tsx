import { TPerformancetable } from "@/lib/parse-table";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export function BriefingPerfTable({
  table,
  tableTitle,
}: {
  table: TPerformancetable;
  tableTitle: string;
}) {
  return (
    <Table className="border-collapse border">
      <TableHeader className="text-left">
        <TableRow>
          <TableHead className="border">{tableTitle}</TableHead>
          <TableHead className="border">Cor %</TableHead>
          <TableHead className="border">Roll</TableHead>
          <TableHead className="border">Distance</TableHead>
        </TableRow>
      </TableHeader>
      <tbody>
        <TableRow>
          <TableCell>Basic</TableCell>
          <TableCell></TableCell>
          <TableCell>{table.roll}</TableCell>
          <TableCell>{table.dist}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Wind</TableCell>
          <TableCell>{table.windCorrectionPercent.toFixed(0)}</TableCell>
          <TableCell>{table.windCorrectionRoll.toFixed(0)}</TableCell>
          <TableCell>{table.windCorrectionDist.toFixed(0)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Subtotal</TableCell>
          <TableCell></TableCell>
          <TableCell>{table.subTotalRoll.toFixed(0)}</TableCell>
          <TableCell>{table.subTotalDist.toFixed(0)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Surface / cont.</TableCell>
          <TableCell>{table.conditionCorrectionPercent}</TableCell>
          <TableCell>{table.conditionCorrectionRoll}</TableCell>
          <TableCell>{table.conditionCorrectionDist}</TableCell>
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
          <TableCell>{table.totalRoll.toFixed(0)}</TableCell>
          <TableCell>{table.totalDist.toFixed(0)}</TableCell>
        </TableRow>
      </tbody>
    </Table>
  );
}
