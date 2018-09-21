import { getProducts } from './products';
import { notifyCustomers } from './customers';
import { checkStock } from './page';
import { prepare } from './prepare';

export const check = () => {
  prepare();
  const products = getProducts();
  products.forEach(product => {
    const result = checkStock(product.url);
    if (result.stock || TEST) {
      notifyCustomers(result, product);
    }
  });
};

export { clean } from './clean';
