import * as actionTypes from "./action";
import { addProducts, getDetailItem } from "./utils/productOperations";
import {
  addtoCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} from "./utils/cartOperations";
import { addAddress } from "./utils/userOperations";
import {
  orderIndividualProduct,
  checkoutFromCart,
} from "./utils/orderOperations";
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
      let products = addProducts();
      return {
        ...state,
        products: products,
      };
    case actionTypes.DETAIL_PRODUCT:
      const product = getDetailItem(action.productId, state.products);
      return {
        ...state,
        detailProduct: product,
      };
    case actionTypes.ADD_TO_CART:
      const addToCartRes = addtoCart(state.products, action.productId);
      const totals = getTotals([...state.cart, addToCartRes.selectedproduct]);
      return {
        ...state,
        products: [...addToCartRes.tempProducts],
        cart: [...state.cart, addToCartRes.selectedproduct],
        detailProduct: { ...addToCartRes.selectedproduct },
        cartSubTotal: totals.subTotal,
        cartTax: totals.tax,
        cartTotal: totals.total,
      };
    case actionTypes.SAVE_ADDRESS:
      const addressNew = addAddress(
        action.addressData.flatNo,
        action.addressData.colony,
        action.addressData.city,
        action.addressData.stateVal
      );
      return {
        ...state,
        address: addressNew,
      };
    case actionTypes.INCREMENT_QUANTITY:
      let tempCart = incrementQuantity(state.cart, action.productId);
      const updatedtotals = getTotals(tempCart);
      return {
        ...state,
        cart: [...tempCart],
        cartSubTotal: updatedtotals.subTotal,
        cartTax: updatedtotals.tax,
        cartTotal: updatedtotals.total,
      };
    case actionTypes.DECREMENT_QUANTITY:
      const decrementQuantityres = decrementQuantity(
        state.cart,
        state.products,
        action.productId
      );
      if (decrementQuantityres.isZero) {
        const delTotals = getTotals(decrementQuantityres.tempCartDel);
        return {
          ...state,
          cart: [...decrementQuantityres.tempCartDel],
          products: [...decrementQuantityres.tempProducts],
          cartSubTotal: delTotals.subTotal,
          cartTax: delTotals.tax,
          cartTotal: delTotals.total,
        };
      } else {
        const updatedtotalsNew = getTotals(decrementQuantityres.cartTemp);
        return {
          ...state,
          cart: [...decrementQuantityres.cartTemp],
          cartSubTotal: updatedtotalsNew.subTotal,
          cartTax: updatedtotalsNew.tax,
          cartTotal: updatedtotalsNew.total,
        };
      }
    case actionTypes.ORDER_INDIVIDUAL_PRODUCT:
      return {
        ...state,
        orders: [
          ...state.orders,
          orderIndividualProduct(state.products, action.productId),
        ],
      };
    case actionTypes.CHECKOUT_FROM_CART:
      const checkoutFromCartRes = checkoutFromCart(state.orders, state.cart);
      return {
        ...state,
        orders: checkoutFromCartRes.orginalorderList,
        cart: [],
        products: checkoutFromCartRes.newProductList,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0,
      };
    case actionTypes.EMPTY_CART:
      return {
        ...state,
        cart: [],
        products: clearCart(),
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0,
      };
  }
  return state;
};

export default reducer;
