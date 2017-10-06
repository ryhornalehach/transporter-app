import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';

const PickupIndexTile = props => {
  let tile, groupText, groupColor;

  if (props.currentClientsGroup.length > 1) {
    groupColor = 'amber';
    groupText = 'Group (1st); ';
  }

  tile = props.currentClientsGroup.map((pickup, index) => {
    let cardClassName, status;
    if (index == 1) {
      groupText = 'Together (2nd); ';
    } else if (index == 2) {
      groupText = 'Together (3rd); ';
    }

    if (pickup.status && pickup.status.includes("cancel")) {
      cardClassName = "card card-size horizontal red accent-1";
    } else if (pickup.dropped_off) {
      cardClassName = "card card-size horizontal grey lighten-1 grey-text text-darken-1";
      status = 'Dropped off';
    } else if (pickup.picked_up) {
      cardClassName = "card card-size horizontal green lighten-3";
      status = 'Picked up';
    } else if (props.cardClassName === 'invisible') {
      cardClassName = "card card-size horizontal invisible";
    } else {
      cardClassName = "card card-size horizontal";
    }



    return (
      <div className="col s12 l6" key={index}>
        <div className={cardClassName}>
          <div className="card-content">
            <div className="row">
                <span className="card-title"><a href={`/pickups/${pickup.id}`}>{pickup.name}</a></span>
                <span className="card-title">{status}</span>
            </div>
            <p><b>At:</b> {pickup.pickup_time}</p>
            <p><b className={groupColor}>Comments: {groupText}</b> {pickup.comment}</p>
            <p><b>From:</b> {pickup.pickup_city}<b> &nbsp; To:</b> {pickup.dropoff_city}</p>
          </div>
        </div>
      </div>
    )
  })

  return(
    <div>
      {tile}
    </div>
  )
}

export default PickupIndexTile
