import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';

const PickupIndexTile = props => {
  let cardClassName, status;
  if (props.cardClassName === 'picked_up') {
    cardClassName = "card card-size horizontal green lighten-3";
    status = 'Picked up';
  } else if (props.cardClassName === 'dropped_off') {
    cardClassName = "card card-size horizontal grey darken-1";
    status = 'Dropped off';
  } else if (props.cardClassName === 'invisible') {
    cardClassName = "card card-size horizontal invisible";
  } else {
    cardClassName = "card card-size horizontal";
  }

  return(
    <div>
      <div className="col s12 l6">
        <div className={cardClassName}>
          <div className="card-content">
            <div className="row">
                <span className="card-title"><a href={`/pickups/${props.pickup.id}`}>{props.pickup.name}</a></span>
                <span className="card-title">{status}</span>
            </div>
            <p><b>At:</b> {props.pickup.pickup_time}</p>
            <p><b>From:</b> {props.pickup.pickup_city}<b> &nbsp; To:</b> {props.pickup.dropoff_city}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PickupIndexTile
