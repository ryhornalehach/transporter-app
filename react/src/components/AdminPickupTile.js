import React from 'react';

const AdminPickupTile = props => {
  let pickupAddressInformation = `${props.pickupInfo.pickup_address}, ${props.pickupInfo.pickup_city}`;
  let dropoffAddressInformation = `${props.pickupInfo.dropoff_address}, ${props.pickupInfo.dropoff_city}`;
  let pickupLink = `https://www.google.com/maps/place/${pickupAddressInformation}`
  let dropoffLink = `https://www.google.com/maps/place/${dropoffAddressInformation}`

  let pickupText, dropoffText;
  if (props.pickedUp) {
    pickupText = 'Client was successfully picked up'
  } else {
    pickupText = 'Client has not been picked up yet'
  }
  if (props.droppedOff) {
    dropoffText = 'Client was successfully dropped off'
  } else {
    dropoffText = 'Client has not been dropped off yet'
  }
  
  return (
    <div className="row">
      <div className="card horizontal">
        <div className="card-stacked">
          <div className="card-content">
            <span className="card-title">{props.pickupInfo.name}</span>
            <p><b>At: </b>{props.pickupInfo.pickup_time} &nbsp; <b>Comments: </b>{props.pickupInfo.comment}</p>
            <p><b>Pickup address: </b><a href={pickupLink}>{pickupAddressInformation}</a></p>
            <p><b>Pickup address: </b><a href={dropoffLink}>{dropoffAddressInformation}</a></p>
            <div className="card-action">

              <div className="row">
                <div className="col s5 large-text">
                  <b>{pickupText}</b>
                </div>
                <div className="col s7">
                  {props.buttonConfirmPickup}
                </div>
              </div>

              <div className="row">
                <div className="col s5 large-text">
                  <b>{dropoffText}</b>
                </div>
                <div className="col s7">
                  {props.buttonConfirmDropoff}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPickupTile
