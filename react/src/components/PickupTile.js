import React from 'react';

const PickupTile = props => {
  let addressInformation, typeOfAddress = '';
  let pickupText, dropoffText, link;
  let buttonConfirmPickup = props.buttonConfirmPickup;
  let buttonConfirmDropoff = props.buttonConfirmDropoff;

  if (props.pickedUp) {
    pickupText = 'Client was successfully picked up'
    addressInformation = `${props.pickupInfo.dropoff_address}, ${props.pickupInfo.dropoff_city}`;
    typeOfAddress = 'Drop off'
  } else {
    pickupText = 'Client has not been picked up yet'
    addressInformation = `${props.pickupInfo.pickup_address}, ${props.pickupInfo.pickup_city}`;
    typeOfAddress = 'Pickup'
  }
  if (props.droppedOff) {
    dropoffText = 'Client was successfully dropped off'
  } else {
    dropoffText = 'Client has not been dropped off yet'
  }
  link = `https://www.google.com/maps/place/${addressInformation}`

  if (props.status == 'not_yet') {
    addressInformation = 'You must pickup previous client before.'
    link = '#'
    buttonConfirmPickup = null;
  } else if (props.status == 'pickup_only') {
    addressInformation = `${props.pickupInfo.pickup_address}, ${props.pickupInfo.pickup_city}`;
    typeOfAddress = 'Pickup'
    link = `https://www.google.com/maps/place/${addressInformation}`
    buttonConfirmDropoff = null;
  }

  return (
    <div className="row">
      <div className="card horizontal">
        <div className="card-stacked">
          <div className="card-content">
            <span className="card-title">{props.pickupInfo.name}</span>
            <p><b>At: </b>{props.pickupInfo.pickup_time} &nbsp; <b>Comments: </b>{props.pickupInfo.comment}</p>
            <p><b>{typeOfAddress} address: </b><a href={link}>{addressInformation}</a></p>
            <div className="card-action">

              <div className="row">
                <div className="col s12 m5 large-text">
                  <b>{pickupText}</b>
                </div>
                <div className="col s12 m7">
                  {buttonConfirmPickup}
                </div>
              </div>

              <div className="row">
                <div className="col s12 m5 large-text">
                  <b>{dropoffText}</b>
                </div>
                <div className="col s12 m7">
                  {buttonConfirmDropoff}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PickupTile
