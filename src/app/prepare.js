import consts from './consts';
import { verifySheet } from './util/sheet';

export const validateSheets = () => {
  consts.sheetNames.forEach(verifySheet);
};

export const prepare = () => {
  validateSheets();
};
