import { getProducts, updatePrice } from './products';
import { checkPrice, checkStock } from './stock';
import { prepare } from './prepare';
import { getCustomers } from './customers';
import { notify } from './email';

export { trigger } from './timer';

export const check = () => {
  prepare();
  const customers = getCustomers();
  const products = getProducts()
    .map(product => ({
      ...product,
      ...checkStock(product)
    }))
    .filter(checkPrice)
    .map(product => {
      notify(customers, product);
      return product;
    });
  updatePrice(products);
};
