import { storeProducts } from "../../data";
export const orderIndividualProduct = (productsList, productId) => {
  const productSel = productsList.find((item) => {
    return item.id === productId;
  });
  const orderDetail = {};
  orderDetail.productId = productSel.id;
  orderDetail.orderTotalAmnt = parseFloat(
    ((productSel.price + 1) * 0.1).toFixed(2)
  );
  orderDetail.productTitle = productSel.title;
  orderDetail.orderQuantity = 1;
  orderDetail.productImg = productSel.img;
  orderDetail.orderDate = new Date();
  orderDetail.status = "Delivered";
  return orderDetail;
};

export const checkoutFromCart = (ordersList, cartList) => {
  let orginalorderList = ordersList;
  let orderList = [];
  cartList.forEach((element) => {
    const orderDet = {};
    orderDet.productId = element.id;
    orderDet.productTitle = element.title;
    let taxAmnt = element.price * element.count * 0.1;
    orderDet.orderTotalAmnt = parseFloat(
      (element.price * element.count + taxAmnt).toFixed(2)
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
  return { orginalorderList, newProductList };
};
