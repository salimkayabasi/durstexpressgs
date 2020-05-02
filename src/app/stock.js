const fetchPage = (url) => UrlFetchApp.fetch(url).getContentText();

const findPrice = (page) => {
  const keyStart = '<span class="price">';
  const keyStop = ' €</span>';

  const start = page.indexOf(keyStart) + keyStart.length;
  const end = page.indexOf(keyStop, start);

  const price = Number(page.slice(start, end).replace(',', '.'));
  Logger.log('Price found as %s', price);
  return price;
};

const isAvailable = (page) => {
  const yes = '<span>Lieferbar</span>';
  const no = '<span>Derzeit nicht lieferbar</span>';
  return page.indexOf(yes) !== -1 && page.indexOf(no) === -1;
};

const checkPrice = (product) => product.stock && product.actualPrice !== product.price;

const checkStock = ({ url }) => {
  const page = fetchPage(url);
  const actualPrice = findPrice(page);
  const stock = isAvailable(page);
  return {
    actualPrice,
    stock,
  };
};

module.exports = {
  checkPrice,
  checkStock,
};
