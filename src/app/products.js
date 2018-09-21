const sheetName = 'Products';

function getSheet() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
}

function readProductsFromSheet() {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  const result = [];
  for (let i = 1; i < data.length; i += 1) {
    result.push({
      name: data[i][0],
      price: Number(data[i][1]),
      url: data[i][2]
    });
  }
  return result;
}

export const getProducts = () => readProductsFromSheet();

export const updatePriceOnSheet = (url, price) => {
  const sheet = getSheet();
  const dataRange = sheet.getDataRange();
  const data = dataRange.getValues();

  data.map(product => {
    const result = product;
    const pUrl = product[2];
    if (pUrl === url) {
      result[1] = price;
    }
    return result;
  });
  dataRange.setValues(data);
};
