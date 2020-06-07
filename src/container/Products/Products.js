import React, { Component } from "react";
import { connect } from 'react-redux';
import Product from "../../components/Products/Product";
import * as actionTypes from '../../store/action'
import "./Products.css";
class Products extends Component {
  componentDidMount() {
    document.getElementById("headertag").innerHTML = "E Commerce | Products";
    if(this.props.productsList.length===0){
      this.props.addProducts();
    }
  }
  postSelectedHandler = (id) => {
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
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
      productsList:state.products
  };
};

const mapDispatchToProps = dispatch => {
  return {
      addProducts: () => dispatch({type: actionTypes.ADD_PRODUCTS}),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
