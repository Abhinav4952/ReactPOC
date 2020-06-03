import React from "react";
import "./Cart.css";
import Product1 from "../../../img/product-1.png";
const cart = (props) => (
  <div className="card mb-3">
    <div class="card-horizontal">
      <div class="img-square-wrapper">
        <img class="" src={Product1} alt="Card image cap" />
      </div>
      <div class="card-body">
        <h4 class="card-title">{props.title}</h4>
        <p class="card-text">{props.description}</p>
        <p>
          Price:-${props.price}
        </p>
        <div>
        <button type="button" class="btn btn-dark btn-circle btn-sm sm-2" onClick={()=>props.addQuantity(props.productId)}>+</button> 
        <input type="text" readonly class="form-control-plaintext sm-2"  value={props.count}></input>
        <button type="button" class="btn btn-dark btn-circle btn-sm sm-2" onClick={()=>props.decQuantity(props.productId)}>-</button>
        </div>
      </div>
    </div>
  </div>
);

export default cart;
