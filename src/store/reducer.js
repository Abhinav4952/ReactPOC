import * as actionTypes from "./action";
import { storeProducts, detailProduct } from "../data";
const initialState = {
  products: [],
  detailProduct: null,
  cart: [],
  cartSubTotal: 0,
  cartTax: 0,
  cartTotal: 0,
  address: [],
  orders: [],
};

const getItem = (id, products) => {
  const product = products.find((item) => {
    if (item.id === id) {
      return item;
    }
  });
  return product;
};
const getTotals = (cart) => {
  let subTotal = 0;
  cart.map((item) => (subTotal += item.total));
  const tempTax = subTotal * 0.1;
  const tax = parseFloat(tempTax.toFixed(2));
  const total = subTotal + tax;
  return {
    subTotal,
    tax,
    total,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PRODUCTS:
      let products = [];
      storeProducts.forEach((item) => {
        const singleItem = { ...item };
        products = [...products, singleItem];
      });
      return {
        ...state,
        products: products,
      };
    case actionTypes.DETAIL_PRODUCT:
      const product = getItem(action.productId, state.products);
      return {
        ...state,
        detailProduct: product,
      };
    case actionTypes.ADD_TO_CART:
      let tempProducts = [...state.products];
      const index = tempProducts.indexOf(
        getItem(action.productId, state.products)
      );
      const selectedproduct = tempProducts[index];
      selectedproduct.inCart = true;
      selectedproduct.count = 1;
      const price = selectedproduct.price;
      selectedproduct.total = price;
      const totals = getTotals([...state.cart, selectedproduct]);
      return {
        ...state,
        products: [...tempProducts],
        cart: [...state.cart, selectedproduct],
        detailProduct: { ...selectedproduct },
        cartSubTotal: totals.subTotal,
        cartTax: totals.tax,
        cartTotal: totals.total,
      };
    case actionTypes.SAVE_ADDRESS:
      const addressNew = [
        action.addressData.flatNo,
        action.addressData.colony,
        action.addressData.city,
        action.addressData.stateVal,
      ];
      console.log(addressNew);
      return {
        ...state,
        address: addressNew,
      };
    case actionTypes.INCREMENT_QUANTITY:
      let tempCart = [...state.cart];
      const selectedProduct = tempCart.find((item) => {
        return item.id === action.productId;
      });
      const indexx = tempCart.indexOf(selectedProduct);
      const productDetail = tempCart[indexx];
      console.log("Product Detail");
      console.log(productDetail);
      productDetail.count = productDetail.count + 1;
      productDetail.total = productDetail.count * productDetail.price;
      const updatedtotals = getTotals(tempCart);
      console.log("Printing totals");
      console.log(updatedtotals);
      return {
        ...state,
        cart: [...tempCart],
        cartSubTotal: updatedtotals.subTotal,
        cartTax: updatedtotals.tax,
        cartTotal: updatedtotals.total,
      };
    case actionTypes.DECREMENT_QUANTITY:
      let cartTemp = [...state.cart];
      const selectedProductNew = cartTemp.find((item) => {
        return item.id === action.productId;
      });
      const indexNew = cartTemp.indexOf(selectedProductNew);
      const productDetailNew = cartTemp[indexNew];
      console.log("Product Detail");
      console.log(productDetailNew);
      productDetailNew.count = productDetailNew.count - 1;
      if (productDetailNew.count === 0) {
        let tempProducts = [...state.products];
        let tempCartDel = [...state.cart];
        const idDel = tempProducts.indexOf(
          getItem(action.productId, tempProducts)
        );
        let removedProduct = tempProducts[idDel];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;
        tempCartDel = tempCartDel.filter((item) => {
          return item.id !== action.productId;
        });
        const delTotals = getTotals(tempCartDel);
        console.log("updated Products");
        console.log(tempProducts);
        return {
          ...state,
          cart: [...tempCartDel],
          products: [...tempProducts],
          cartSubTotal: delTotals.subTotal,
          cartTax: delTotals.tax,
          cartTotal: delTotals.total,
        };
      } else {
        productDetailNew.total =
          productDetailNew.count * productDetailNew.price;
        const updatedtotalsNew = getTotals(cartTemp);
        console.log("Printing totals");
        console.log(updatedtotalsNew);
        return {
          ...state,
          cart: [...cartTemp],
          cartSubTotal: updatedtotalsNew.subTotal,
          cartTax: updatedtotalsNew.tax,
          cartTotal: updatedtotalsNew.total,
        };
      }
    case actionTypes.ORDER_INDIVIDUAL_PRODUCT:
      const productSel = state.products.find((item) => {
        return item.id === action.productId;
      });
      const orderDetail = {};
      orderDetail.productId = productSel.id;
      orderDetail.orderTotalAmnt = parseFloat(
        ((productSel.price + 1) * 0.1).toFixed(2)
      );
      orderDetail.productTitle=productSel.title;
      orderDetail.orderQuantity = 1;
      orderDetail.productImg = productSel.img;
      orderDetail.orderDate = new Date();
      orderDetail.status = "Delivered";
      return {
        ...state,
        orders: [...state.orders, orderDetail],
      };
    case actionTypes.CHECKOUT_FROM_CART:
      let orginalorderList=state.orders
      let orderList = [];
      state.cart.forEach((element) => {
        const orderDet = {};
        orderDet.productId = element.id;
        orderDet.productTitle=element.title;
        let taxAmnt=element.price * element.count * 0.1
        orderDet.orderTotalAmnt = parseFloat(
          ((element.price * element.count )+ taxAmnt).toFixed(2)
        );
        orderDet.orderQuantity = element.count;
        orderDet.productImg = element.img;
        orderDet.orderDate = new Date();
        orderDet.status = "Delivered";
        orderList = [...orderList, orderDet];
        orginalorderList.push(orderDet);
      });
      let newProductList = [];
      storeProducts.forEach((item) => {
        const singleItem = { ...item };
        newProductList = [...newProductList, singleItem];
      });
      console.log("Other form of putting ele");
      console.log(orginalorderList);
      return {
        ...state,
        orders: orginalorderList,
        cart: [],
        products: newProductList,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0,
      };
    case actionTypes.EMPTY_CART:
      let initProcutList = [];
      storeProducts.forEach((item) => {
        const singleItem = { ...item };
        initProcutList = [...initProcutList, singleItem];
      });
      return {
        ...state,
        cart: [],
        products: initProcutList,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0,
      }
  }
  return state;
};

export default reducer;
