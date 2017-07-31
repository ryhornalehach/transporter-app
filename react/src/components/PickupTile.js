import React from 'react';

const PickupTile = props => {
  let addressInformation, typeOfAddress = '';
  if (props.pickupInfo.picked_up) {
    addressInformation = `${props.pickupInfo.dropoff_address}, ${props.pickupInfo.dropoff_city}`;
    typeOfAddress = 'Drop off'
  } else {
    addressInformation = `${props.pickupInfo.pickup_address}, ${props.pickupInfo.pickup_city}`;
    typeOfAddress = 'Pickup'
  }
  return (
    <div className="row">
      <div className="col s12 l6">
        <div className="card horizontal">
          <div className="card-stacked">
            <div className="card-content">
              <span className="card-title">{props.pickupInfo.name}</span>
              <p><b>At: </b>{props.pickupInfo.pickup_time} &nbsp; <b>Comments: </b>{props.pickupInfo.comment}</p>
              <p><b>{typeOfAddress} address: </b>{addressInformation}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PickupTile
