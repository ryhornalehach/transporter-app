import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PickupForm from '../components/PickupForm';

class NewPickup extends Component {
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
      openDays: [],
      selectedDay: '',
      error: null,
      notice: null
    }
    this.handleTextField = this.handleTextField.bind(this)  //binding the functions
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDayChange = this.handleDayChange.bind(this)
  }

  componentDidMount() {
    fetch('/api/v1/days',{
      credentials: "same-origin"
    })
    .then(response => response.json())
    .then(body => {
      this.setState({ openDays: body.openDays, selectedDay: body.openDays[0][0].id })
    })
  }

  handleTextField(event) {    // function to handle the text fields.
    let value = event.target.value;   // current value of the field
    let name = event.target.name;     // name of the corresponding text field
    this.setState({ [name]: value })  // setting the state with the value of the corresponding field
  }

  handleDayChange(event) {    // function to handle the select field.
    this.setState({ selectedDay: event.target.value })  // setting the state with the value of the field
  }

  handleSubmit(event) {     // function to handle the submit of the form
    event.preventDefault();   // preventing the default action - page reload
    let currentPickup = { name: this.state.name,    // assigning a variable with the current values of the fields
      pickupTime: this.state.pickupTime, appointmentTime: this.state.appointmentTime,
      phone: this.state.phone, comment: this.state.comment,
      pickupAddress: this.state.pickupAddress, pickupCity: this.state.pickupCity,
      dropoffAddress: this.state.dropoffAddress, dropoffCity: this.state.dropoffCity
    }

      this.setState({   // clearing the text fields
        name: '', pickupTime: '', appointmentTime: '', phone: '', comment: '',
        pickupAddress: '', pickupCity: '', dropoffAddress: '', dropoffCity: '',
        error: null,
      })

      fetch('/api/v1/pickups/', {   // creating a new pickup through the API point
        method: 'POST',   // POST method for creating new data entry
        credentials: "same-origin",
        body: JSON.stringify({ name: currentPickup.name, pickupTime: currentPickup.pickupTime,
        appointmentTime: currentPickup.appointmentTime, phone: currentPickup.phone, comment: currentPickup.comment,
        pickupAddress: currentPickup.pickupAddress, pickupCity: currentPickup.pickupCity, dayId: this.state.selectedDay,
        dropoffAddress: currentPickup.dropoffAddress, dropoffCity: currentPickup.dropoffCity })
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

    return(
          <div>
            <div className="error">{this.state.error}</div><div className="notice">{this.state.notice}</div>
            <div className="row">
              <div className="col s12 m6">
                <h5>Enter new client details:</h5>
              </div>
            </div>
                <PickupForm
                    pickupTime={this.state.pickupTime}
                    appointmentTime={this.state.appointmentTime}
                    phone={this.state.phone}
                    comment={this.state.comment}
                    pickupAddress={this.state.pickupAddress}
                    pickupCity={this.state.pickupCity}
                    dropoffAddress={this.state.dropoffAddress}
                    dropoffCity={this.state.dropoffCity}
                    handleTextField={this.handleTextField}
                    handleSubmit={this.handleSubmit}
                    handleDayChange={this.handleDayChange}
                    selectedDay={this.state.selectedDay}
                    openDays={this.state.openDays}
                />
          </div>
    )
  }
}

export default NewPickup
