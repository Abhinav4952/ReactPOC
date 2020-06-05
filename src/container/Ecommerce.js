import React, { Component } from "react";
// import axios from 'axios';
import { Route, NavLink, Switch, Redirect } from "react-router-dom";

import Products from "./Products/Products";
import Orders from "./Orders/Orders";
import Cart from "./Cart/Cart";
import ProductDetail from "./ProductDetail/ProductDetail";
import classes from './Ecommerce.css';
class Ecommerce extends Component {
    
  render() {
    return (
      <div className="Ecommerce">
        <header>
          <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
            <h5 className="my-0 mr-md-auto font-weight-normal" id="headertag">E commerce</h5>
            <nav className="navbar navbar-expand-lg navbar-light my-2 my-md-0 mr-md-3">
              <NavLink to="/" exact activeClassName={classes.LinkR} style={{marginRight:12+'px'}}>
                Products
              </NavLink>
              <NavLink to="/cart" exact style={{marginRight:12+'px'}}>
                Cart
              </NavLink>
              <NavLink to="/orders" exact>
                Orders
              </NavLink>
              
            </nav>
          </div>
        </header>
        <Switch>
            <Route path="/orders" exact component={Orders} />
            <Route path="/cart" exact component={Cart} />
            {/* <Route path="/img" component={Cart} /> */}
            <Route path="/:id" exact component={ProductDetail} />
            <Route path="/" component={Products} />
        </Switch>
      </div>
    );
  }
}

export default Ecommerce;
