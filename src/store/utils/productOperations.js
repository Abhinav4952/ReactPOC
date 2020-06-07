import { storeProducts } from "../../data";

export const addProducts = () => {
  let products = [];
  storeProducts.forEach((item) => {
    const singleItem = { ...item };
    products = [...products, singleItem];
  });
  return products;
};

export const getDetailItem = (id, products) => {
  const product = products.find((item) => {
    if (item.id === id) {
      return item;
    }
  });
  return product;
};
