import React, { Component } from "react";

import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

class Map extends Component {
  render() {
    const marker = this.props.marker || {};
    return (
      <GoogleMap
        defaultZoom={this.props.zoom}
        defaultCenter={this.props.center}
      >
        <Marker position={marker} />
      </GoogleMap>
    );
  }
}

export default withGoogleMap(Map);
