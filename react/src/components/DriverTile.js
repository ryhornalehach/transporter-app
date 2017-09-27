import React from 'react';
import AdminPickupTile from './AdminPickupTile'

const DriverTile = props => {



  return (
    <div className="row">
      <div className="card horizontal">
        <div className="card-stacked">
          <div className="card-content">
            <span className="card-title">{props.driverInfo.first_name} {props.driverInfo.last_name} <img src={props.driverInfo.profile_photo.url} height="60" className= "circle" /></span>
            <p><b>Phone: </b>{props.driverInfo.phone} &nbsp; <b>Email: </b>{props.driverInfo.email}</p>
            <p><b>Address: </b>{props.driverInfo.address}, {props.driverInfo.city}, {props.driverInfo.state} {props.driverInfo.zip}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DriverTile
