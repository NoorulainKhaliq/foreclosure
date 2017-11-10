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
        let hasDupes = false;
        let found = [];
        //console.log(properties.query_value[0].formatedAddress.place_id);
        properties.forEach(p => {
          if (!p.formatedAddress) {
            found.push(p);
            console.log(p.address.replace(",", ""));
          }
        });
        console.log(found);
        // properties.query_value.reduce((f, p) => {
        //   console.log(p);
        //   if (f.includes(p)) {
        //     hasDupes = true;
        //   }
        //   if (!hasDupes && !f.includes(p)) {
        //     f.push(p);
        //   }
        //   return f;
        // }, []);
        // console.log(hasDupes);
        return this.setState({ properties });
      });
  }

  componentDidUpdate() {
    console.log(this.state.properties);
  }
  render() {
    const results =
      this.state.properties.length > 0 ? this.state.properties : null;
    // console.log(results);
    const image = !!results ? results[0].formatedAddress.streetView : null;
    return (
      <div className="main">
        <div className="property-list">
          {results &&
            results.map((property, i) => {
              return (
                <div key={i}>
                  <Link to={property.PDFlink} />
                  <p>{property.address}</p>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
