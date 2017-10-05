import React from 'react';

const PickupForm = props => {
    return(
      <div>
        <div className="row">
          <div className="col s12 m6">
            <label>Pickup Time:
              <input
                name='pickupTime'
                onChange={props.handleTextField} // using the handler function for the text fields
                type='text'
                value={props.pickupTime}   // getting the value from the state
              />
            </label>
          </div>
          <div className="col s12 m6">
            <label>Appointment Time:
              <input
                name='appointmentTime'
                onChange={props.handleTextField}
                type='text'
                value={props.appointmentTime}
              />
            </label>
          </div>
        </div>

        <div className="row">
          <div className="col s12 m6">
            <label>Name:
              <input
                name='name'
                onChange={props.handleTextField}
                type='text'
                value={props.name}
              />
            </label>
          </div>
          <div className="col s12 m6">
            <label>Phone:
              <input
                name='phone'
                onChange={props.handleTextField}
                type='text'
                value={props.phone}
              />
            </label>
          </div>
        </div>

        <div className="row">
          <div className="col s12">
            <label>Comment:
              <input
                name='comment'
                onChange={props.handleTextField}
                type='text'
                value={props.comment}
              />
            </label>
          </div>
        </div>

        <div className="row">
          <div className="col s12 m6">
            <label>Pickup Address:
              <input
                name='pickupAddress'
                onChange={props.handleTextField}
                type='text'
                value={props.pickupAddress}
              />
            </label>
          </div>
          <div className="col s12 m6">
            <label>Pickup City:
              <input
                name='pickupCity'
                onChange={props.handleTextField}
                type='text'
                value={props.pickupCity}
              />
            </label>
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
            <label>Dropoff City:
              <input
                name='dropoffCity'
                onChange={props.handleTextField}
                type='text'
                value={props.dropoffCity}
              />
            </label>
          </div>
        </div>

        <div className="row">
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
