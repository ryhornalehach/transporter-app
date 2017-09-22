import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PickupTile from '../components/PickupTile';
import AdminPickupTile from '../components/AdminPickupTile';
import AssignForm from '../components/AssignForm';
import MapComponent from '../components/MapComponent';

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
      allDrivers: [],
      assignedDriverText: 'N/A',
      selectedDriverId: 0,
      error: null
    }
    this.handlePickupButton = this.handlePickupButton.bind(this);
    this.handleDropoffButton = this.handleDropoffButton.bind(this);
    this.handleForm = this.handleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    let idRegex = /[0-9]+\/{0,1}$/
    let pickupId = this.props.location.pathname.match(idRegex)[0]
    fetch(`/api/v1/pickups/${pickupId}`,{
      credentials: "same-origin"
    })
    .then(response => response.json())
    .then(pickup => {
      if (pickup.driver) {
        let name = `${pickup.driver.first_name} ${pickup.driver.last_name}`
        this.setState({ pickupInfo: pickup.pickup, pickupId: pickupId, pickedUp: pickup.pickup.picked_up, droppedOff: pickup.pickup.dropped_off, assignedDriverText: name })
      } else {
        this.setState({ pickupInfo: pickup.pickup, pickupId: pickupId, pickedUp: pickup.pickup.picked_up, droppedOff: pickup.pickup.dropped_off })
      }
    })

    fetch('/api/v1/users',{
      credentials: "same-origin"
    })
    .then(response => response.json())
    .then(body => {
      if (body.allDrivers) {
        let allDriversList = body.allDrivers
        let empty = { id: null, first_name: '--', last_name: '--' }
        allDriversList.unshift(empty);
        this.setState({ allDrivers: allDriversList, showUser: body.auth, currentUser: body.user })
      } else {
        this.setState({ showUser: body.auth, currentUser: body.user })
      }
    })
  }

  handleChange(event) {
    this.setState({ selectedDriverId: event.target.value})
  }

  handleForm(event) {
    event.preventDefault();
    fetch(`/api/v1/users/${this.state.selectedDriverId}/`, {
      method: 'PATCH',
      credentials: "same-origin",
      body: JSON.stringify({ selectedDriverId: this.state.selectedDriverId, currentClientId: this.state.pickupId })
    })
    .then(response => response.json())
    .then(body => {
      let name;
      if (body) {
        name = `${body.first_name} ${body.last_name}`;
      } else {
        name = 'N/A';
      }
      this.setState({ assignedDriverText: name })
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

  render() {
    let buttonConfirmPickup, form, buttonConfirmDropoff, pickupTile, origin, destination;

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
    } else {
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
    }
    if (this.state.currentUser.admin) {

      form = <AssignForm
                  allDrivers={this.state.allDrivers}
                  currentClientId={this.state.pickupId}
                  handleForm={this.handleForm}
                  handleChange={this.handleChange}
                  selectedDriverId={this.state.selectedDriverId}
              />
    } else {
      form = null;
    }

    origin = `${this.state.pickupInfo.pickup_address}, ${this.state.pickupInfo.pickup_city}`
    destination = `${this.state.pickupInfo.dropoff_address}, ${this.state.pickupInfo.dropoff_city}`

    return(
      <div>
        <div className="red-text">{this.state.error}</div>
        {pickupTile}
        <div className="row">
          <div className="col s12 l6">
            <Link to='/pickups' className="btn waves-effect waves-light navbar-color-dark">Back to all clients</Link>
          </div>
          <div className="col s12 l6">
            <div className="large-text"><b>Assigned driver: </b>{this.state.assignedDriverText}</div>
            {form}
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
      </div>
    )
  }
}

export default Pickup
