import { storeProducts } from "../../data";
import { getDetailItem } from "./productOperations";

export const addtoCart = (orginalProducts, porductId) => {
  let tempProducts = [...orginalProducts];
  const index = tempProducts.indexOf(getDetailItem(porductId, orginalProducts));
  const selectedproduct = tempProducts[index];
  selectedproduct.inCart = true;
  selectedproduct.count = 1;
  const price = selectedproduct.price;
  selectedproduct.total = price;
  return { tempProducts, selectedproduct };
};

export const incrementQuantity = (cartList, porductId) => {
  let tempCart = [...cartList];
  const selectedProduct = tempCart.find((item) => {
    return item.id === porductId;
  });
  const indexx = tempCart.indexOf(selectedProduct);
  const productDetail = tempCart[indexx];
  productDetail.count = productDetail.count + 1;
  productDetail.total = productDetail.count * productDetail.price;
  return tempCart;
};

export const decrementQuantity = (cartList, productsList, productId) => {
  let cartTemp = [...cartList];
  const selectedProductNew = cartTemp.find((item) => {
    return item.id === productId;
  });
  const indexNew = cartTemp.indexOf(selectedProductNew);
  const productDetailNew = cartTemp[indexNew];
  productDetailNew.count = productDetailNew.count - 1;
  if (productDetailNew.count === 0) {
    let tempProducts = [...productsList];
    let tempCartDel = [...cartList];
    const idDel = tempProducts.indexOf(getDetailItem(productId, tempProducts));
    let removedProduct = tempProducts[idDel];
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;
    tempCartDel = tempCartDel.filter((item) => {
      return item.id !== productId;
    });
    return { tempProducts, tempCartDel, isZero: true };
  } else {
    productDetailNew.total = productDetailNew.count * productDetailNew.price;
    return { cartTemp, isZero: false };
  }
};

export const clearCart = () => {
  let initProductList = [];
  storeProducts.forEach((item) => {
    const singleItem = { ...item };
    initProductList = [...initProductList, singleItem];
  });
  return initProductList;
};
