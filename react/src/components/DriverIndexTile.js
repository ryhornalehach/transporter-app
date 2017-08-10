import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';

const DriverIndexTile = props => {

  return(
    <div>
      <div className="col s12 l6">
        <div className="card card-size horizontal">
          <div className="card-content">
            <div className="row">
                <span className="card-title"><a href={`/drivers/${props.driver.id}`}>{props.driver.first_name} {props.driver.last_name} <img src={props.driver.profile_photo.url} height="60" className= "circle" /></a></span>
                <span className="card-title">{status}</span>
            </div>
            <p><b>Phone:</b> {props.driver.phone}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DriverIndexTile
