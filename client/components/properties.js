import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Map from "./googleMap";

export default class Properties extends Component {
  constructor() {
    super();
    this.state = {
      properties: [],
      coordinates: {
        lat: 0,
        lng: 0
      }
    };
    this.setCoordinates = this.setCoordinates.bind(this);
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

  setCoordinates(lat, lng) {
    this.setState({
      coordinates: {
        lat,
        lng
      }
    });
  }

  render() {
    const results =
      this.state.properties.length > 0 ? this.state.properties : null;
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
                    <img
                      src={property.formatedAddress.streetView}
                      onClick={() => {
                        this.setCoordinates(
                          parseFloat(
                            property.formatedAddress.geometry.location.lat
                          ),
                          parseFloat(
                            property.formatedAddress.geometry.location.lng
                          )
                        );
                      }}
                    />
                  )}
                </div>
              );
            })}
        </div>
        <div>
          <Map
            center={{ lat: 40.650002, lng: -73.949997 }}
            marker={{
              lat: this.state.coordinates.lat,
              lng: this.state.coordinates.lng
            }}
            zoom={13}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `400px` }} />}
          />
        </div>
      </div>
    );
  }
}
