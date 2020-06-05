import React, { Component } from "react";
// import axios from 'axios';
// import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actionTypes from "../../store/action";
import CartComponent from "../../components/Products/Cart/Cart";
import CartPayDetails from "../../components/CartPayDetails/CartPayDetails";
import AddressDetails from "../../components/AddressDetails/AddressDetails";
// import EmptyCart from "../../img/cart-empty.png"
class Cart extends Component {
  componentDidMount() {
    document.getElementById("headertag").innerHTML = "E Commerce | Cart";
    console.log(this.props.cart);
    // console.log(new Date());
  }
  render() {
    console.log("printing cart");
    console.log(this.props.cart);
    let checkoutOption =
      this.props.cart.length === 0
        ? null
        : () => {
            return (
              <div>
                <button className="btn btn-primary">Checkout</button>
                <button
                  className="btn btn-primary"
                  style={{ marginLeft: 25 + "px" }}
                >
                  Clear Cart
                </button>
              </div>
            );
          };
    console.log(checkoutOption);
    // console.log(this.props.cart);
    let cartList = null;
    cartList =
      this.props.cart.length === 0 ? (
        <div>
          <img src="../../img/cart-empty.png" alt="..." />
        </div>
      ) : (
        this.props.cart.map((cartItem) => {
          return (
            <CartComponent
              key={cartItem.id}
              productId={cartItem.id}
              title={cartItem.title}
              description={cartItem.info}
              image={cartItem.img}
              price={cartItem.price}
              count={cartItem.count}
              addQuantity={this.props.incrementQuantity}
              decQuantity={this.props.decrementQuantity}
            />
          );
        })
      );
    console.log(cartList);
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-5">
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Billing Address</h5>
                <div>
                  <AddressDetails
                    flatNo={this.props.address[0]}
                    colony={this.props.address[1]}
                    city={this.props.address[2]}
                    stateVal={this.props.address[3]}
                    saveaddress={this.props.storeAddress}
                    enableSave={false}
                  />
                </div>
              </div>
            </div>
            <div className="container">
              <CartPayDetails
                cartSubTotal={this.props.cartSubTotal}
                cartTax={this.props.cartTax}
                cartTotal={this.props.cartTotal}
                disabled={this.props.cart.length === 0}
              />
              <button
                className="btn btn-primary"
                disabled={this.props.cart.length === 0}
                onClick={() => this.props.checkoutFromCart()}
              >
                Checkout
              </button>
              <button
                className="btn btn-primary"
                style={{ marginLeft: 25 + "px" }}
                disabled={this.props.cart.length === 0}
                onClick={() => this.props.clearCart()}
              >
                Clear Cart
              </button>
              {/* {checkoutOption} */}
            </div>
          </div>
          <div className="col-sm-7">
            <div className="container">{cartList}</div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    // prs: state.value
    cart: state.cart,
    cartSubTotal: state.cartSubTotal,
    cartTax: state.cartTax,
    cartTotal: state.cartTotal,
    address: state.address,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getValue: () => dispatch({ type: actionTypes.GET_VALUE }),
    storeAddress: (flatNo, colony, city, stateVal) =>
      dispatch({
        type: actionTypes.SAVE_ADDRESS,
        addressData: {
          flatNo: flatNo,
          colony: colony,
          city: city,
          stateVal: stateVal,
        },
      }),
    incrementQuantity: (id) =>
      dispatch({ type: actionTypes.INCREMENT_QUANTITY, productId: id }),
    decrementQuantity: (id) =>
      dispatch({ type: actionTypes.DECREMENT_QUANTITY, productId: id }),
    checkoutFromCart: () => dispatch({ type: actionTypes.CHECKOUT_FROM_CART }),
    clearCart: () => dispatch({ type: actionTypes.EMPTY_CART }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
