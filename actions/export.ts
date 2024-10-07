"use server";

import * as ExcelJS from "exceljs";

export async function exportExcel() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "PIC";
  workbook.lastModifiedBy = "PIC";
  workbook.created = new Date();
  workbook.modified = new Date();

  const ws = workbook.addWorksheet("DA42NG");
  ws.mergeCells("A1:J1");
  ws.getCell("A1").value = "Take-off & Landing distances";
  ws.getCell("A2").value = "Weather";

  ws.mergeCells("C2:D2");
  ws.getCell("C2").value = "Departure";

  ws.mergeCells("A3:B3");
  ws.getCell("A3").value = `Date 01/01/1990`;

  ws.getCell("A4").value = "Wind";
  ws.getCell("C4").value = "210";
  ws.getCell("D4").value = "12";

  const buffer = await workbook.xlsx.writeBuffer();

  return buffer;
}
