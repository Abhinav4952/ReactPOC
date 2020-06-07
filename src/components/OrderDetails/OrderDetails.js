import React from "react";
import "./OrderDetails.css";
const orderDetails = (props) => (
  <div class="card mb-3">
    <div class="card-header">
      <div class="title-card">
        <div>
          <h5>Ordered On:-{props.orderDate}</h5>
        </div>
        <div style={{ textAlign: "right" }}>
          <h5>Status:-{props.orderStatus}</h5>
        </div>
      </div>
    </div>
    <div class="card mb-3" style={{ maxWidth: 100 + "%", border: 0 }}>
      <div class="row no-gutters">
        <div class="img-square-wrapper">
          <img class="" src={props.orderImage} alt="Card  im" />
        </div>
        <div class="card-body">
          <h4 class="card-title">{props.bookTitle}</h4>
          <p>Book Price:-${props.orderPrice}</p>
          <p>Quantity:-{props.orderQuantity}</p>
        </div>
      </div>
    </div>
  </div>
);

export default orderDetails;
