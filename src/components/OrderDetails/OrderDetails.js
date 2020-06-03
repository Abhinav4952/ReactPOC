import React from "react";
import "./OrderDetails.css";
import Product1 from "../../img/sample-phone.png";
const orderDetails = (props) => (
  <div class="card mb-3">
    <div class="card-header">
      <div class="title-card">
        <div><h5>Ordered On:-{props.orderDate}</h5></div>
        <div style={{ textAlign: "right" }}><h5>Status:-{props.orderStatus}</h5></div>
      </div>
    </div>
    <div class="card-horizontal">
      <div class="img-square-wrapper">
        <img class="" src={Product1} alt="Card image cap" />
      </div>
      <div class="card-body">
        <h4 class="card-title">{props.bookTitle}</h4>
        <p>Book Price:-${props.orderPrice}</p>
        <p>Quantity:-${props.orderQuantity}</p>
      </div>
    </div>
  </div>
);

export default orderDetails;
