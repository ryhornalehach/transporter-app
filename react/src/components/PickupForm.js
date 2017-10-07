import React from 'react';
import { Row, Input, Button, Icon } from 'react-materialize'

const PickupForm = props => {
  let daysMap = props.openDays.map( (day) => {
    let dayString = new Date (day[0].date).toUTCString();  // converting the date to Date object and to UTC string
    let index2 = dayString.indexOf('00:');            // getting the index of an element where to cut the date string
    dayString = dayString.substring(0, index2);     // cutting the date string
    return (
        <option key={day[0].id} value={day[0].id} >{dayString}</option>   // creating options for the select field
    )
  })

    return(
      <div>
        <div className="row">
          <div className="col s12 m6">
            <label>Pickup Time:</label>
              <input
                name='pickupTime'
                onChange={props.handleTextField} // using the handler function for the text fields
                type='text'
                value={props.pickupTime}   // getting the value from the state
              />
          </div>
          <div className="col s12 m6">
            <label>Appointment Time:</label>
              <input
                name='appointmentTime'
                onChange={props.handleTextField}
                type='text'
                value={props.appointmentTime}
              />
          </div>
        </div>

        <div className="row">
          <div className="col s12 m6">
            <label>Name:</label>
              <input
                name='name'
                onChange={props.handleTextField}
                type='text'
                value={props.name}
              />
          </div>
          <div className="col s12 m6">
            <label>Phone:</label>
              <input
                name='phone'
                onChange={props.handleTextField}
                type='text'
                value={props.phone}
              />
          </div>
        </div>

        <div className="row">
          <div className="col s12">
            <label>Comment:</label>
              <input
                name='comment'
                onChange={props.handleTextField}
                type='text'
                value={props.comment}
              />
          </div>
        </div>

        <div className="row">
          <div className="col s12 m6">
            <label>Pickup Address:</label>
              <input
                name='pickupAddress'
                onChange={props.handleTextField}
                type='text'
                value={props.pickupAddress}
              />
          </div>
          <div className="col s12 m6">
            <label>Pickup City:</label>
              <input
                name='pickupCity'
                onChange={props.handleTextField}
                type='text'
                value={props.pickupCity}
              />
          </div>
        </div>

        <div className="row">
          <div className="col s12 m6">
            <label>Dropoff Address:
              <input
                name='dropoffAddress'
                onChange={props.handleTextField}
                type='text'
                value={props.dropoffAddress}
              />
            </label>
          </div>
          <div className="col s12 m6">
            <label>Dropoff City:</label>
              <input
                name='dropoffCity'
                onChange={props.handleTextField}
                type='text'
                value={props.dropoffCity}
              />
          </div>
        </div>

        <div className="row">
          <div className="col s12 m6">
              <label>Day:</label>
              <Input
                  s={12}
                  name="day"
                  type='select'
                  value={props.selectedDay}
                  onChange={props.handleDayChange}
              >
                  {daysMap}
              </Input>
          </div>
          <div className="col s12 m6">
            <input
              type="submit"
              onClick={props.handleSubmit}   // using the handler function for submit button
              className="btn waves-effect waves-light navbar-color-dark"
              value="Submit"
            />
          </div>
        </div>
      </div>
    )
  }

export default PickupForm
