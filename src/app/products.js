import { getSheet } from './util/sheet';
import consts from './consts';

export const getProducts = () => {
  const sheet = getSheet(consts.products.sheetName);
  return sheet
    .getDataRange()
    .getValues()
    .slice(1)
    .reduce((result, row) => {
      result.push({
        name: row[0],
        price: Number(row[1]),
        url: row[2]
      });
      return result;
    }, []);
};

const getPriceByUrl = (products, url) => {
  const [product] = products.filter(p => p.url === url);
  return product && product.actualPrice;
};

export const updatePrice = products => {
  const sheet = getSheet(consts.products.sheetName);
  const dataRange = sheet.getDataRange();
  dataRange.setValues(
    dataRange.getValues().map(row => {
      const [name, price, url] = row;
      const actualPrice = getPriceByUrl(products, url);
      return [name, actualPrice || price, url];
    })
  );
};
