import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
      error: null,
      notice: null
    }
    this.handleTextField = this.handleTextField.bind(this)  //binding the functions
    this.handleSubmit = this.handleSubmit.bind(this)
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
        pickupAddress: currentPickup.pickupAddress, pickupCity: currentPickup.pickupCity,
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
          <h5>Enter new client details:</h5>
          <div className="col s12 m6">
            <label>Pickup Time:
              <input
                name='pickupTime'
                onChange={this.handleTextField} // using the handler function for the text fields
                type='text'
                value={this.state.pickupTime}   // getting the value from the state
              />
            </label>
          </div>
          <div className="col s12 m6">
            <label>Appointment Time:
              <input
                name='appointmentTime'
                onChange={this.handleTextField}
                type='text'
                value={this.state.appointmentTime}
              />
            </label>
          </div>
        </div>

        <div className="row">
          <div className="col s12 m6">
            <label>Name:
              <input
                name='name'
                onChange={this.handleTextField}
                type='text'
                value={this.state.name}
              />
            </label>
          </div>
          <div className="col s12 m6">
            <label>Phone:
              <input
                name='phone'
                onChange={this.handleTextField}
                type='text'
                value={this.state.phone}
              />
            </label>
          </div>
        </div>

        <div className="row">
          <div className="col s12">
            <label>Comment:
              <input
                name='comment'
                onChange={this.handleTextField}
                type='text'
                value={this.state.comment}
              />
            </label>
          </div>
        </div>

        <div className="row">
          <div className="col s12 m6">
            <label>Pickup Address:
              <input
                name='pickupAddress'
                onChange={this.handleTextField}
                type='text'
                value={this.state.pickupAddress}
              />
            </label>
          </div>
          <div className="col s12 m6">
            <label>Pickup City:
              <input
                name='pickupCity'
                onChange={this.handleTextField}
                type='text'
                value={this.state.pickupCity}
              />
            </label>
          </div>
        </div>

        <div className="row">
          <div className="col s12 m6">
            <label>Dropoff Address:
              <input
                name='dropoffAddress'
                onChange={this.handleTextField}
                type='text'
                value={this.state.dropoffAddress}
              />
            </label>
          </div>
          <div className="col s12 m6">
            <label>Dropoff City:
              <input
                name='dropoffCity'
                onChange={this.handleTextField}
                type='text'
                value={this.state.dropoffCity}
              />
            </label>
          </div>
        </div>

        <div className="row">
          <input
            type="submit"
            onClick={this.handleSubmit}   // using the handler function for submit button
            className="btn waves-effect waves-light navbar-color-dark"
            value="Submit"
          />
        </div>
      </div>
    )
  }
}

export default NewPickup
