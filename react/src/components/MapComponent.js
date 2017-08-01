import React, { Component } from 'react';
import GoogleMap from 'google-map-react';

class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    let center = {lat: 42.36, lng: -71.056};
    let zoom = 11;
    let map_options = {
      scrollwheel: false
    }
    return (
      <div className="map-container">
        <GoogleMap
          bootstrapURLKeys={{key: 'AIzaSyBXZCwUd1IZQbiD-wcYYVou2Y2dFHNhOdM', libraries: "geometry"}}
          center={center}
          zoom={zoom}
          options={map_options}
        />
      </div>
    );
  }
}

export default MapComponent;
