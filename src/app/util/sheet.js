export const getSheet = sheetName =>
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

export const createSheet = sheetName =>
  SpreadsheetApp.getActiveSpreadsheet().insertSheet(sheetName, 0);

export const removeSheet = sheetName =>
  SpreadsheetApp.getActiveSpreadsheet().deleteSheet(getSheet(sheetName));

export const verifySheet = sheetName => getSheet(sheetName) || createSheet(sheetName);

export const getAllSheetsName = () =>
  SpreadsheetApp.getActiveSpreadsheet()
    .getSheets()
    .map(sheet => sheet.getName());
