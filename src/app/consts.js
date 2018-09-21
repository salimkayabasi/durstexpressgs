export default {
  products: {
    sheetName: 'Products'
  },
  customers: {
    sheetName: 'Customers'
  },
  get sheetNames() {
    return [this.products.sheetName, this.customers.sheetName];
  }
};
