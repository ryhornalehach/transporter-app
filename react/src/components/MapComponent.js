import React, { Component } from 'react';
import GoogleMap from 'google-map-react';

class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: { lat: 42.36,
                lng: -71.056
      },
      location: { lat: 42.36,
                  lng: -71.056
      },
      zoom: 12,
      map: null
    }
  }

  componentDidUpdate() {
    let map = this.state.map;
    let google = window.google;

    let directionsService = new google.maps.DirectionsService();
    let directionsDisplay = new google.maps.DirectionsRenderer();

    directionsDisplay.setMap(map);
    directionsService.route({
      origin: this.props.origin,
      destination: this.props.destination,
      travelMode: google.maps.TravelMode.DRIVING
    }, function (response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      } else {
        console.error('Cannot plan route', status);
      }
    });
  }

  render() {
    let googleKey = document.getElementById('app').getAttribute('data-env');
    let map_options = {
      scrollwheel: true
    }
    return (
      <div className="row">
        <div>{this.state.error}</div>
          <div className="map-container">
            <GoogleMap
              bootstrapURLKeys={{key: googleKey}}
              center={this.state.center}
              zoom={this.state.zoom}
              options={map_options}
              onGoogleApiLoaded={(param) => this.setState({ map: param.map })}
              yesIWantToUseGoogleMapApiInternals
            />
          </div>

      </div>
    );
  }
}

export default MapComponent;
