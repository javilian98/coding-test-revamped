import * as XLSX from "xlsx";

export const parseExcel = (fileBuffer) => {
  const workbook = XLSX.read(fileBuffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  // Assuming the Excel sheet has a structure with headers in the first row
  const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  // Extracted data may need further processing based on specific structure

  console.log("parseExcel data ", data);
  return data;
};
