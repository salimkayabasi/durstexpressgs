const { getSheetData, setSheetValues } = require('./sheet');
const { checkProduct } = require('./product');
const { reply } = require('./telegram');

const check = () => {
  let rows = getSheetData();
  const map = rows.reduce((result, row) => {
    const [, , , price, url] = row;
    if (!result[url]) {
      return Object.assign(result, { [url]: price });
    }
    return result;
  }, {});

  const updated = Object.entries(map).reduce((result, [url, p]) => {
    const { price } = checkProduct(url);
    if (price !== p) {
      return Object.assign(result, { [url]: price });
    }
    return result;
  }, {});
  if (!Object.keys(updated).length) {
    return;
  }
  rows = getSheetData();
  setSheetValues(
    rows.map((row) => {
      const [user, id, name, price, url] = row;
      const update = updated[url];
      if (update) {
        reply(
          id,
          `Price of *${name}* has changed to *${update}* from *${price}*`,
        );
      }
      return [user, id, name, update || price, url];
    }),
  );
};

module.exports = {
  check,
};
