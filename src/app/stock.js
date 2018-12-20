export const fetchPage = url => UrlFetchApp.fetch(url).getContentText();

export const findPrice = page => {
  const keyStart = '<span class="price">';
  const keyStop = ' €</span>';

  const start = page.indexOf(keyStart) + keyStart.length;
  const end = page.indexOf(keyStop, start);

  const price = Number(page.slice(start, end).replace(',', '.'));
  Logger.log('Price found as %s', price);
  return price;
};

export const isAvailable = page => {
  const yes = '<span>Lieferbar</span>';
  const no = '<span>Derzeit nicht lieferbar</span>';
  return page.indexOf(yes) !== -1 && page.indexOf(no) === -1;
};

export const checkPrice = product => product.stock && product.actualPrice !== product.price;

export const checkStock = ({ url }) => {
  const page = fetchPage(url);
  const actualPrice = findPrice(page);
  const stock = isAvailable(page);
  return {
    actualPrice,
    stock
  };
};
