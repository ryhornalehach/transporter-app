import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PickupTile from '../components/PickupTile';
import AdminPickupTile from '../components/AdminPickupTile';
import MapComponent from '../components/MapComponent';
import StatusAssignForm from '../components/StatusAssignForm';

class Pickup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pickupInfo: {},
      pickupId: null,
      currentUser: {},
      pickedUp: false,
      droppedOff: false,
      showUser: false,
      groupStatus: null,
      pickupStatus: null,
      error: null
    }
    this.handlePickupButton = this.handlePickupButton.bind(this);
    this.handleDropoffButton = this.handleDropoffButton.bind(this);
    this.handleStatusButton = this.handleStatusButton.bind(this);
    this.handlePickupStatus = this.handlePickupStatus.bind(this);
  }

  componentDidMount() {
    let pickupId = this.props.match.params.id
    fetch(`/api/v1/pickups/${pickupId}`,{
      credentials: "same-origin"
    })
    .then(response => response.json())
    .then(pickup => {
      this.setState({ pickupInfo: pickup.pickup, pickupId: pickupId, pickedUp: pickup.pickup.picked_up, droppedOff: pickup.pickup.dropped_off, groupStatus: pickup.group_status, pickupStatus: pickup.pickup.status })
    })

    fetch('/api/v1/users',{
      credentials: "same-origin"
    })
    .then(response => response.json())
    .then(body => {
      this.setState({ showUser: body.auth, currentUser: body.user })
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
      if (body.error) {
        this.setState({ error: body.error })
      } else {
        this.setState({ pickedUp: body.picked_up, droppedOff: body.dropped_off })
      }
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

  handleStatusButton(event) {
    event.preventDefault()
    fetch(`/api/v1/pickups/${this.state.pickupId}/`, {
      method: 'PATCH',
      credentials: "same-origin",
      body: JSON.stringify({ pickupStatus: this.state.pickupStatus, stateType: 'statusChange' })
    })
    .then(response => response.json())
    .then(body =>{
      this.setState({ pickupStatus: body.status })
    })
  }

  handlePickupStatus(event) {
    this.setState({ pickupStatus: event.target.value })
  }

  render() {
    let buttonConfirmPickup, buttonConfirmDropoff, pickupTile, origin, destination, link, statusAssignForm;
    let pickupStatus = this.state.pickupStatus;
    if (!pickupStatus) {
      pickupStatus = '';
    }

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

    if (this.state.currentUser.admin) {
      pickupTile = <AdminPickupTile
                        pickupInfo={this.state.pickupInfo}
                        showUser={this.state.showUser}
                        pickedUp={this.state.pickedUp}
                        droppedOff={this.state.droppedOff}
                        buttonConfirmPickup={buttonConfirmPickup}
                        buttonConfirmDropoff={buttonConfirmDropoff}
                        handlePickupButton={this.handlePickupButton}
                        handleDropoffButton={this.handleDropoffButton}
                  />
      link = <Link to={`/pickups/${this.state.pickupId}/edit`} className="btn waves-effect waves-light navbar-color-dark">
                  Edit client information
              </Link>
      statusAssignForm = <StatusAssignForm
                            handleStatusButton={this.handleStatusButton}
                            handlePickupStatus={this.handlePickupStatus}
                            pickupStatus={pickupStatus}
                          />
    } else {
      pickupTile = <PickupTile
                        groupStatus={this.state.groupStatus}
                        pickupInfo={this.state.pickupInfo}
                        showUser={this.state.showUser}
                        pickedUp={this.state.pickedUp}
                        droppedOff={this.state.droppedOff}
                        buttonConfirmPickup={buttonConfirmPickup}
                        buttonConfirmDropoff={buttonConfirmDropoff}
                        handlePickupButton={this.handlePickupButton}
                        handleDropoffButton={this.handleDropoffButton}
                  />
      link = <Link to='/pickups' className="btn waves-effect waves-light navbar-color-dark">
                  Back to all clients
              </Link>
    }

    origin = `${this.state.pickupInfo.pickup_address}, ${this.state.pickupInfo.pickup_city}`
    destination = `${this.state.pickupInfo.dropoff_address}, ${this.state.pickupInfo.dropoff_city}`

    return(
      <div>
        <div className="red-text">{this.state.error}</div>
        {pickupTile}
        <div className="row">
          <div className="col s12 l6">
            {link}
          </div>
          <div className="col s12 l6">
            {statusAssignForm}
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <MapComponent
                  origin={origin}
                  destination={destination}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Pickup
