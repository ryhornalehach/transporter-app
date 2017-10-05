import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PickupForm from '../components/PickupForm';

class PickupEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      pickupTime: '',
      appointmentTime: '',
      phone: '',
      comment: '',
      pickupAddress: '',
      pickupCity: '',
      dropoffAddress: '',
      dropoffCity: '',
      error: null,
      notice: null
    }
    this.handleTextField = this.handleTextField.bind(this)  //binding the functions
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    let pickupId = this.props.match.params.id
    fetch(`/api/v1/pickups/${pickupId}`,{
      credentials: "same-origin"
    })
    .then(response => response.json())
    .then(pickup => {
      // debugger;
      this.setState({ name: pickup.pickup.name, pickupTime: pickup.pickup.pickup_time,
        appointmentTime: pickup.pickup.appointment_time, phone: pickup.pickup.phone,
        comment: pickup.pickup.comment, pickupAddress: pickup.pickup.pickup_address,
        pickupCity: pickup.pickup.pickup_city, dropoffAddress: pickup.pickup.dropoff_address,
        dropoffCity: pickup.pickup.dropoff_city })
    })
  }

  handleTextField(event) {    // function to handle the text fields.
    let value = event.target.value;   // current value of the field
    let name = event.target.name;     // name of the corresponding text field
    this.setState({ [name]: value })  // setting the state with the value of the corresponding field
  }

  handleSubmit(event) {     // function to handle the submit of the form
    event.preventDefault();   // preventing the default action - page reload
    let currentPickup = { name: this.state.name,    // assigning a variable with the current values of the fields
      pickupTime: this.state.pickupTime, appointmentTime: this.state.appointmentTime,
      phone: this.state.phone, comment: this.state.comment,
      pickupAddress: this.state.pickupAddress, pickupCity: this.state.pickupCity,
      dropoffAddress: this.state.dropoffAddress, dropoffCity: this.state.dropoffCity
    }

      fetch(`/api/v1/pickups/${this.props.match.params.id}/`, {   // creating a new pickup through the API point
        method: 'PATCH',   // PATCH method for updating the entry
        credentials: "same-origin",
        body: JSON.stringify({ currentPickup: currentPickup, stateType: 'edit' })
      })
      .then(response => response.json())
      .then(body =>{
        if (body.error) {   // checking if pickup creation was successful
          this.setState({ error: body.error })  // displaying the error message
        } else {
          this.setState({ notice: body.notice })  // displaying the success notice
        }
      })
  }

  render() {
    let phone = this.state.phone;
    if (!phone) {
      phone = '';
    }
    let comment = this.state.comment;
    if (!comment) {
      comment = '';
    }


    return(
      <div>
        <div className="error">{this.state.error}</div><div className="notice">{this.state.notice}</div>
        <div className="row">
          <div className="col s12 m6">
            <h5>Edit client details:</h5>
          </div>
        </div>
            <PickupForm
                pickupTime={this.state.pickupTime}
                appointmentTime={this.state.appointmentTime}
                phone={phone}
                name={this.state.name}
                comment={this.state.comment}
                pickupAddress={this.state.pickupAddress}
                pickupCity={this.state.pickupCity}
                dropoffAddress={this.state.dropoffAddress}
                dropoffCity={this.state.dropoffCity}
                handleTextField={this.handleTextField}
                handleSubmit={this.handleSubmit}
            />
      </div>
    )
  }
}

export default PickupEdit
