import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PickupTile from '../components/PickupTile'

class Pickup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pickupInfo: {},
      pickupId: null,
      showUser:false
    }
  }

  componentDidMount() {
    let idRegex = /[0-9]+\/{0,1}$/
    let pickupId = this.props.location.pathname.match(idRegex)[0]
    fetch(`/api/v1/pickups/${pickupId}`)
    .then(response => response.json())
    .then(pickup => {
      this.setState({ pickupInfo: pickup, pickupId: pickupId })
    })

    fetch('/api/v1/users',{
      credentials: "same-origin"
    })
    .then(response => response.json())
    .then(body => {
      this.setState({showUser:body.auth})
    })
  }

  render() {
    return(
      <div>
        <PickupTile
          pickupInfo={this.state.pickupInfo}
          showUser={this.state.showUser}
        />
        <div className="row">
          <div className="col s12 l6">
            <Link to='/pickups' className="btn waves-effect waves-light navbar-color-dark">Back to all clients</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Pickup
