// const { getProducts, updatePrice } = require('./products');
// const { checkPrice, checkStock } = require('./stock');
// const prepare = require('./prepare');
// const { getCustomers } = require('./customers');
// const { notify } = require('./email');
//
// const { trigger } = require('./timer');
//
// const check = () => {
//   prepare();
//   const customers = getCustomers();
//   const products = getProducts()
//     .map((product) => ({
//       ...product,
//       ...checkStock(product),
//     }))
//     .filter(checkPrice)
//     .map((product) => {
//       notify(customers, product);
//       return product;
//     });
//   updatePrice(products);
// };
//
// module.exports = {
//   trigger,
//   check,
// };
