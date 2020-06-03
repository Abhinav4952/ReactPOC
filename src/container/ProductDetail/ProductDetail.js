import React, { Component } from "react";
// import axios from 'axios';
// import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import "./ProductDetail.css";
import Product1 from "../../img/product-1.png"
import { connect } from 'react-redux';
import * as actionTypes from '../../store/action'
class ProductDetail extends Component {
  
  constructor(props) {
    super(props);
    
  }
  componentDidMount() {
    console.log(this.props.match.params.id);
    console.log(this.props.orders);
    this.loadData();
    document.getElementById("headertag").innerHTML = "E Commerce";
  }
  componentDidUpdate() {
    this.loadData();
  }

  loadData() {
    if (this.props.match.params.id) {
      if (
        !this.props.selectedBook ||
        (this.props.selectedBook &&
          this.props.selectedBook.id !== +this.props.match.params.id)
      ) {
       this.props.getProduct(+this.props.match.params.id)
      }
    }
  }

  render() {
      console.log(document.getElementById("header"));
    const bookId = this.props.selectedBook && this.props.selectedBook.id;
    const bookPrice = this.props.selectedBook && this.props.selectedBook.price;
    const bookTitle = this.props.selectedBook && this.props.selectedBook.title;
    const bookinCart= this.props.selectedBook && this.props.selectedBook.inCart;
    const bookDescription =
      this.props.selectedBook && this.props.selectedBook.info;
    console.log("selected poduct");
    console.log(this.props.selectedBook && this.props.selectedBook);
    return (
      <div className="flex-container">
        <div><img src={Product1}  alt="..."/></div>
        <div>
          <div className="card" style={{maxWidth: 25 + 'em'    }}>
            <div className="card-header">{bookTitle}</div>
            <div className="card-body">
              <h5 className="card-title">BookPrice:-{bookPrice}</h5>
              <p className="card-text">{bookDescription}</p>
              
              <div className="flex-container">
                  <div><button type="button" className="btn btn-secondary" onClick={()=>this.props.orderProduct(bookId)}>Buy Now</button></div>
                  <div><button type="button" className="btn btn-secondary" onClick={()=>this.props.addtoCart(bookId)} disabled={bookinCart}>Add to cart</button></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
      // prs: state.value
      selectedBook:state.detailProduct,
      orders:state.orders
  };
};

const mapDispatchToProps = dispatch => {
  return {
      getProduct: (id) => dispatch({type: actionTypes.DETAIL_PRODUCT,productId:id}),
      addtoCart:(id) => dispatch({type: actionTypes.ADD_TO_CART,productId:id}),
      orderProduct:(id)=>dispatch({type:actionTypes.ORDER_INDIVIDUAL_PRODUCT,productId:id})
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
