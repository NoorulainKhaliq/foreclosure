import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Properties extends Component {
  constructor() {
    super();
    this.state = {
      properties: []
    };
  }

  componentWillMount() {
    axios
      .get("/api/properties")
      .then(res => res.data)
      .then(properties => {
        let found = []; //properties that have no formatted_address
        properties.forEach(property => {
          if (!property.formatedAddress) {
            found.push(property);
          }
        });
        return this.setState({ properties });
      });
  }

  render() {
    const results =
      this.state.properties.length > 0 ? this.state.properties : null;
    const image = !!results ? results[0].formatedAddress.streetView : null;
    console.log(results);
    //const addresses = [];
    // console.log("these are results ", results);
    // for (let i = 0; i < results.length; i++) {
    //   addresses.push(results[i]);
    // }
    // console.log("these are from the loop ", addresses);

    return (
      <div className="main">
        <div className="property-list">
          {results &&
            results.map((property, i) => {
              return (
                <div className="property-info" key={i}>
                  <a href={property.PDFlink}>Prop Details</a>
                  <p>Address: {property.address}</p>
                  {property.formatedAddress && (
                    <img src={property.formatedAddress.streetView} />
                  )}
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
