import React from "react";
import "./CartPayDetails.css";
const cartPayDetails = (props) => (
  <div className="card mb-3">
    <div class="card-body">
      <h4 class="card-title">Payment Info</h4>
      <div class="table-responsive">
        <table class="table table-sm">
          <tbody>
            <tr>
              <th scope="row">Items Price</th>
              <td></td>
              <td></td>
              <td>${props.cartSubTotal}</td>
            </tr>
            <tr>
              <th scope="row">Tax</th>
              <td></td>
              <td></td>
              <td>${props.cartTax}</td>
            </tr>
            <tr>
              <th scope="row">Total</th>
              <td></td>
              <td></td>
              <td colspan="9">${props.cartTotal}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default cartPayDetails;
