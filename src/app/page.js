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

export const checkStock = url => {
  const page = fetchPage(url);
  const price = findPrice(page);
  const stock = isAvailable(page);
  return {
    price,
    stock
  };
};
