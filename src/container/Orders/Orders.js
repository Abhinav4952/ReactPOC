import React, { Component } from "react";
import { connect } from "react-redux";
import OrderDetails from "../../components/OrderDetails/OrderDetails";
class Orders extends Component {
  componentDidMount() {
    document.getElementById("headertag").innerHTML = "E Commerce | Orders";
  }
  render() {
    let ordersList = null;
    ordersList =
      this.props.orders.length === 0 ? (
        <h3>Orders Not Yet Placed</h3>
      ) : (
        this.props.orders.map((orderDetail) => {
          var d = new Date(orderDetail.orderDate),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            year = d.getFullYear();

          if (month.length < 2) month = "0" + month;
          if (day.length < 2) day = "0" + day;
          return (
            <OrderDetails
              bookTitle={orderDetail.productTitle}
              orderPrice={orderDetail.orderTotalAmnt}
              orderQuantity={orderDetail.orderQuantity}
              orderImage={orderDetail.productImg}
              orderDate={[year, month, day].join('-')}
              orderStatus={orderDetail.status}
            />
          );
        })
      );
    return <div class="container">{ordersList}</div>;
  }
}
const mapStateToProps = (state) => {
  return {
    orders: state.orders,
  };
};
export default connect(mapStateToProps)(Orders);
