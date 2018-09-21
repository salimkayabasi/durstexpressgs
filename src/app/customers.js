import { sendEmail } from './email';
import { updatePriceOnSheet } from './products';

export const readCustomersFromSheet = sheetName => {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  const data = sheet.getDataRange().getValues();
  const result = [];
  for (let i = 0; i < data.length; i += 1) {
    result.push(data[i][0]);
  }
  return result;
};

export const getCustomers = () => readCustomersFromSheet('Customers');

export const notifyCustomers = (result, product) => {
  const oldPrice = product.price;
  const newPrice = result.price;

  if (TEST || oldPrice !== newPrice) {
    let subject = Utilities.formatString(
      'Price Changed %s (%s -> %s)',
      product.name,
      oldPrice,
      newPrice
    );
    if (TEST) {
      subject = Utilities.formatString('TEST %s', subject);
    }
    const message = Utilities.formatString(
      'It was %s now %s \n%s\n\nIt must be available for ordering',
      oldPrice,
      newPrice,
      product.url
    );
    sendEmail(subject, message);
    updatePriceOnSheet(product.url, newPrice);
  }
};
