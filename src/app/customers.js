import { getSheet } from './util/sheet';
import consts from './consts';

export const getCustomers = () => {
  const sheet = getSheet(consts.customers.sheetName);
  return sheet
    .getDataRange()
    .getValues()
    .slice(1)
    .reduce((result, row) => {
      result.push(row[0]);
      return result;
    }, []);
};
