import consts from './consts';
import { getAllSheetsName, removeSheet, verifySheet } from './util/sheet';

export const clean = sheetNames =>
  getAllSheetsName()
    .filter(sheetName => sheetNames.indexOf(sheetName) === -1)
    .forEach(removeSheet);

export const prepare = () => {
  const sheets = consts.sheetNames;
  clean(sheets);
  sheets.forEach(verifySheet);
};
