import React, { Component } from "react";
// import axios from 'axios';
// import { Route, NavLink, Switch, Redirect } from "react-router-dom";
// import { storeProducts } from "../../data";
import { connect } from 'react-redux';
import Product from "../../components/Products/Product";
import * as actionTypes from '../../store/action'
import "./Products.css";
class Products extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   books: storeProducts,
    // };
  }
  componentDidMount() {
    document.getElementById("headertag").innerHTML = "E Commerce | Products";
    if(this.props.productsList.length==0){
      this.props.addProducts();
    }
  }
  postSelectedHandler = (id) => {
    // this.props.history.push({pathname: '/posts/' + id});
    this.props.history.push("/" + id);
    console.log(this.props.productsList);
  };
  render() {
    console.log("Products List");
    console.log(this.props.productsList);
    let productss = null;
    productss = this.props.productsList.map((product) => {
      return (
        <Product
          key={product.id}
          title={product.title}
          description={product.info}
          image={product.img}
          clicked={() => this.postSelectedHandler(product.id)}
        />
      );
    });
    return (
      <div>
        <section className="Products">{productss}</section>
        {/* {this.props.productsList[0]} */}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
      // prs: state.value
      productsList:state.products
  };
};

const mapDispatchToProps = dispatch => {
  return {
      addProducts: () => dispatch({type: actionTypes.ADD_PRODUCTS}),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
