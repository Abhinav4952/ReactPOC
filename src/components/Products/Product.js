import React from "react";
import './Product.css'

const product = (props) => (
  <div className="Produuct card"   style={{maxWidth: 25 + 'em'    }}>
  <img src={props.image} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title" onClick={props.clicked}>{props.title}</h5>
   
    <p className="card-text">{props.description}</p>
  </div>
  </div>
 
);

export default product;