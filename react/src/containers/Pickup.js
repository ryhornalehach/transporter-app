import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PickupTile from '../components/PickupTile'

class Pickup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pickupInfo: {},
      pickupId: null,
      currentUserId: null,
      pickedUp: false,
      droppedOff: false,
      showUser:false
    }
    this.handlePickupButton = this.handlePickupButton.bind(this);
    this.handleDropoffButton = this.handleDropoffButton.bind(this);
  }

  componentDidMount() {
    let idRegex = /[0-9]+\/{0,1}$/
    let pickupId = this.props.location.pathname.match(idRegex)[0]
    fetch(`/api/v1/pickups/${pickupId}`)
    .then(response => response.json())
    .then(pickup => {
      this.setState({ pickupInfo: pickup, pickupId: pickupId, pickedUp: pickup.picked_up, droppedOff: pickup.dropped_off })
    })

    fetch('/api/v1/users',{
      credentials: "same-origin"
    })
    .then(response => response.json())
    .then(body => {
      this.setState({ showUser: body.auth, currentUserId: body.id })
    })
  }

  handlePickupButton(event) {
    event.preventDefault()
    fetch(`/api/v1/pickups/${this.state.pickupId}/`, {
      method: 'PATCH',
      credentials: "same-origin",
      body: JSON.stringify({ state: !this.state.pickedUp, stateType: 'picked_up' })
    })
    .then(response => response.json())
    .then(body =>{
      this.setState({ pickedUp: body.picked_up, droppedOff: body.dropped_off })
    })
  }

  handleDropoffButton(event) {
    event.preventDefault()
    fetch(`/api/v1/pickups/${this.state.pickupId}/`, {
      method: 'PATCH',
      credentials: "same-origin",
      body: JSON.stringify({ state: !this.state.droppedOff, stateType: 'dropped_off' })
    })
    .then(response => response.json())
    .then(body =>{
      this.setState({ pickedUp: body.picked_up, droppedOff: body.dropped_off })
    })
  }

  render() {
    let buttonConfirmPickup, buttonConfirmDropoff, pickupTile;

    if (this.state.droppedOff){
      buttonConfirmDropoff = <button type="button" className="btn waves-effect waves-light red" onClick={this.handleDropoffButton}>Not dropped off yet?</button>
    } else {
      buttonConfirmDropoff = <button type="button" className="btn waves-effect waves-light green" onClick={this.handleDropoffButton}>Confirm Successful Drop Off</button>
    }

    if (this.state.pickedUp){
      buttonConfirmPickup = <button type="button" className="btn waves-effect waves-light red" onClick={this.handlePickupButton}>Not picked up?</button>;
    } else {
      buttonConfirmPickup = <button type="button" className="btn waves-effect waves-light green" onClick={this.handlePickupButton}>Confirm Pickup</button>;
      buttonConfirmDropoff = null;
    }

    if (this.state.currentUserId == this.state.pickupInfo.driver_id) {
      pickupTile = <PickupTile
        pickupInfo={this.state.pickupInfo}
        showUser={this.state.showUser}
        pickedUp={this.state.pickedUp}
        droppedOff={this.state.droppedOff}
        buttonConfirmPickup={buttonConfirmPickup}
        buttonConfirmDropoff={buttonConfirmDropoff}
        handlePickupButton={this.handlePickupButton}
        handleDropoffButton={this.handleDropoffButton}
      />
    } else {
      pickupTile = 'You are not authorized'
    }


    return(
      <div>
        {pickupTile}
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
