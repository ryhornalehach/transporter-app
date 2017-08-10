import React from 'react';
import PickupIndexTile from './PickupIndexTile'

const DriverTile = props => {

  let pickups;

  pickups = props.clients.map( (pickup, index) => {
    let cardClassName;
    if (pickup.picked_up && pickup.dropped_off) {
      cardClassName = 'dropped_off';
    } else if (pickup.picked_up) {
      cardClassName = 'picked_up';
    }
    return(
      <PickupIndexTile
        key={index}
        id={pickup.id}
        pickup={pickup}
        cardClassName={cardClassName}
      />
    )
  })

  return (
    <div className="row">
      <div className="card horizontal">
        <div className="card-stacked">
          <div className="card-content">
            <span className="card-title">{props.driverInfo.first_name} {props.driverInfo.last_name} <img src={props.driverInfo.profile_photo.url} height="60" className= "circle" /></span>
            <p><b>Phone: </b>{props.driverInfo.phone} &nbsp; <b>Email: </b>{props.driverInfo.email}</p>
            <p><b>Address: </b>{props.driverInfo.address}, {props.driverInfo.city}, {props.driverInfo.state} {props.driverInfo.zip}</p>
              <h5>Clients: </h5>
              {pickups}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DriverTile
