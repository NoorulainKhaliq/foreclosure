import React, { Component } from "react";

import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

class Map extends Component {
  render() {
    const marker = this.props.marker || {};
    const center = this.props.center || {};
    const zoom = this.props.zoom || {};
    console.log(center);
    return (
      <GoogleMap defaultZoom={this.props.zoom} center={center} zoom={zoom}>
        <Marker position={marker} />
      </GoogleMap>
    );
  }
}

export default withGoogleMap(Map);
