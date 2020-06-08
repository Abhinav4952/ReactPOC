import * as actionTypes from "../action";

export const addProducts = () => {
  return (dispatch) => {
    import("../../data")
      .then((data) => dispatch(saveProducts(data.storeProducts)))
      .catch((err) => console.log(err));
  };
};
export const saveProducts = (res) => {
  return {
    type: actionTypes.ADD_PRODUCTS,
    products: res,
  };
};
