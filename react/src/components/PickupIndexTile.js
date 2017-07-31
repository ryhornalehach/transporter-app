import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';

const PickupIndexTile = props => {
  return(
    <div>
      <div className="col s12 l6">
        <div className="card horizontal">
          <div className="card-content">
            <span className="card-title"><a href={`/pickups/${props.pickup.id}`}>{props.pickup.name}</a></span>
            <p><b>At:</b> {props.pickup.pickup_time}</p>
            <p><b>From:</b> {props.pickup.pickup_city}<b> &nbsp; To:</b> {props.pickup.dropoff_city}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PickupIndexTile
