const fetchPage = (url) => UrlFetchApp.fetch(url).getContentText();
const parseHtml = (page, keyStart, keyStop) => {
  const start = page.indexOf(keyStart) + keyStart.length;
  const end = page.indexOf(keyStop, start);
  const value = page.slice(start, end).trim();
  if (value.indexOf('<') !== -1 || value.indexOf('>') !== -1) {
    throw new Error('Parsing error');
  }
  return value;
};
const readMetaProperty = (page, property) => {
  const keyStart = `<meta property="${property}" content="`;
  const keyStop = '" />';
  return parseHtml(page, keyStart, keyStop);
};
const getAmount = (page) => {
  return readMetaProperty(page, 'product:price:amount');
};
const getCurrency = (page) => {
  return readMetaProperty(page, 'product:price:currency');
};
const getFullPrice = (page) => {
  return `${getAmount(page)} ${getCurrency(page)}`;
};
const getProductName = (page) => {
  return readMetaProperty(page, 'og:title');
};
const checkProduct = (url) => {
  const page = fetchPage(url);
  const price = getFullPrice(page);
  const name = getProductName(page);
  return {
    name,
    price,
  };
};

module.exports = {
  checkProduct,
};
