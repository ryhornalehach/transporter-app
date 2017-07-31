import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';

const PickupIndexTile = props => {
  let cardClassName, status;
  if (props.cardClassName === 'picked_up') {
    cardClassName = "card horizontal green lighten-3";
    status = 'Dropped off';
  } else if (props.cardClassName === 'dropped_off') {
    cardClassName = "card horizontal grey darken-1";
    status = 'Dropped off';
  } else {
    cardClassName = "card horizontal";
  }

  return(
    <div>
      <div className="col s12 l6">
        <div className={cardClassName}>
          <div className="card-content">
            <span className="card-title"><a href={`/pickups/${props.pickup.id}`}>{props.pickup.name}</a>  &nbsp; {status}</span>
            <p><b>At:</b> {props.pickup.pickup_time}</p>
            <p><b>From:</b> {props.pickup.pickup_city}<b> &nbsp; To:</b> {props.pickup.dropoff_city}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PickupIndexTile
