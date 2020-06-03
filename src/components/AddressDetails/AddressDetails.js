import React, { Component } from "react";

import "./AddressDetails.css";

class AddressDetails extends Component {
  state = {
    flatNo: "",
    colony: "",
    city:"",
    stateVal:"",
    editAddressfield:true
  };
  constructor(props){
    super(props);
    
  }
  componentDidMount(){
    this.setState(()=>{
      return {
        flatNo:this.props.flatNo,
        colony:this.props.colony,
        city:this.props.city,
        stateVal:this.props.stateVal,
      }
    })
  }

  flatNoChangedHandler = (event) => {
    this.setState({ flatNo: event.target.value });
  };

  colonyChangedHandler = (event) => {
    this.setState({ colony: event.target.value });
  };
  cityChangedHandler = (event) => {
    this.setState({ city: event.target.value });
  };
  stateValChangedHandler = (event) => {
    this.setState({ stateVal: event.target.value });
  };
  editAddress=(fieldVal)=>{
    this.setState({editAddressfield:!fieldVal})
  }
  
  render() {
    return (
      <div>
        <div className="form-group">
          <label for="exampleInputEmail1">FlatNo</label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter FlatNo"
            value={this.state.flatNo}
            disabled={this.state.editAddressfield}
            onChange={this.flatNoChangedHandler}
          />
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Colony</label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter Colony"
            value={this.state.colony}
            disabled={this.state.editAddressfield}
            onChange={this.colonyChangedHandler}
          />
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">City</label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter City"
            value={this.state.city}
            disabled={this.state.editAddressfield}
            onChange={this.cityChangedHandler}
          />
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">State</label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter State"
            value={this.state.stateVal}
            disabled={this.state.editAddressfield}
            onChange={this.stateValChangedHandler}
          />
        </div>
        <button className="btn btn-primary"  disabled={this.state.editAddressfield} onClick={()=>{this.props.saveaddress(this.state.flatNo,this.state.colony,this.state.city,this.state.stateVal);this.editAddress(this.state.editAddressfield)}} >
          Save Address
        </button>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ marginLeft: 25 + "px" }}
          disabled={!this.state.editAddressfield}
          onClick={()=>{this.editAddress(this.state.editAddressfield)}}
        >
          Edit Address
        </button>
      </div>
    );
  }
}

export default AddressDetails;
