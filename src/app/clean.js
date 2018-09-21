import { getAllSheetsName, removeSheet } from './util/sheet';
import consts from './consts';

export const clean = () => {
  const sheets = consts.sheetNames;
  getAllSheetsName()
    .filter(sheetName => sheets.indexOf(sheetName) === -1)
    .forEach(removeSheet);
};
