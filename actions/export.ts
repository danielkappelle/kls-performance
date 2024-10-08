"use server";

import { TBriefing } from "@/components/briefing/briefing-state";
import { getValueFromTable } from "@/lib/parse-table";
import * as ExcelJS from "exceljs";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVXYZ";

export async function exportExcel(briefing: TBriefing) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile("template.xlsx");

  workbook.creator = briefing.pic || "KLMFA";
  workbook.lastModifiedBy = briefing.pic || "KLMFA";
  workbook.created = new Date();
  workbook.modified = new Date();

  const ws = workbook.getWorksheet("DA42NG")!;

  function getCell(col: number, row: number) {
    return ws.getCell(`${alphabet[col]}${row}`);
  }
  // createBoilerPlate(ws);

  ws.getCell("A3").value = `${
    briefing.airframe?.registration
  } ${briefing.date?.toLocaleDateString("nl-NL")}`;

  for (let i = 0; i < briefing.columns.length; i++) {
    const col = briefing.columns[i];
    const colOffset = 2 + 3 * i;
    getCell(colOffset, 2).value = col.name;
    getCell(
      colOffset,
      3
    ).value = `${col.aerodrome?.icaoCode}/${col.runway?.code}`;
    getCell(colOffset, 4).value = +(col.windDir || 0);
    getCell(colOffset + 1, 4).value = +(col.windKts || 0);
    getCell(colOffset, 8).value = +(col.temp || 15);
    getCell(colOffset, 9).value = +(col.qnh || 1013);
    // -----
    getCell(colOffset, 13).value = +(col.runway?.direction || 0);
    getCell(colOffset, 14).value = +(col.aerodrome?.elevation || 0);
    getCell(colOffset, 15).value = col.runway?.surface;
    getCell(colOffset, 16).value = col.condition;
    getCell(colOffset, 18).value = col.runway?.slope;
    getCell(colOffset, 19).value = col.runway?.tora;
    getCell(colOffset, 20).value = col.runway?.toda;
    getCell(colOffset, 21).value = col.runway?.lda;
    // -----

    // Roll and distances
    const pa =
      (col.aerodrome?.elevation || 0) + (1013 - (col.qnh || 1013)) * 27;

    const perfTable = getValueFromTable(briefing.airframe, pa, col.temp || 15);

    getCell(colOffset, 24).value = perfTable.takeOff.roll;
    getCell(colOffset + 1, 24).value = perfTable.takeOff.dist;

    getCell(colOffset, 33).value = perfTable.landing.roll;
    getCell(colOffset + 1, 33).value = perfTable.landing.dist;

    getCell(colOffset, 42).value = perfTable.landingFlapless.roll;
    getCell(colOffset + 1, 42).value = perfTable.landingFlapless.dist;

    // Contamination
    getCell(colOffset - 1, 28).value = col.condition === "wet" ? 10 : 0;
    getCell(colOffset - 1, 37).value = col.condition === "wet" ? 15 : 0;
    getCell(colOffset - 1, 46).value = col.condition === "wet" ? 15 : 0;
  }

  const buffer = await workbook.xlsx.writeBuffer();

  return buffer;
}
