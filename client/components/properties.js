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
      },
      center: {
        lat: 40.650002,
        lng: -73.949997
      },
      zoom: 13
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
      },
      center: {
        lat,
        lng
      },
      zoom: 15
    });
    console.log(this.state);
  }

  render() {
    const results =
      this.state.properties.length > 0 ? this.state.properties : null;
    return (
      <div className="main flex">
        <div className="flex-1 property-list">
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
        <div className="" style={{ position: "fixed", right: "0" }}>
          <Map
            center={{ lat: this.state.center.lat, lng: this.state.center.lng }}
            marker={{
              lat: this.state.coordinates.lat,
              lng: this.state.coordinates.lng
            }}
            zoom={this.state.zoom}
            containerElement={
              <div
                className="flex"
                style={{ width: `100vh`, height: `100vh` }}
              />
            }
            mapElement={
              <div
                className="flex"
                style={{ width: `100vh`, height: `100vh` }}
              />
            }
          />
        </div>
      </div>
    );
  }
}
