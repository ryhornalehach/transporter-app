import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PickupIndexTile from '../components/PickupIndexTile'

class Pickups extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pickups: [],
      currentUserId: null,
      showUser: false
    }
  }

  componentDidMount() {
    fetch('/api/v1/users',{
      credentials: "same-origin"
    })
    .then(response => response.json())
    .then(body => {
      this.setState({ showUser: body.auth, currentUserId: body.id })
    })

    fetch('/api/v1/pickups')
    .then(response => response.json())
    .then(body => {
      let selectedPickups = [];
      body.forEach((pickup) => {
        if (pickup.driver_id == this.state.currentUserId) {
          selectedPickups.unshift(pickup)
        }
      })
      this.setState({ pickups: selectedPickups})
    })
  }

  render() {
    let pickups;

    if (this.state.showUser) {
      pickups = this.state.pickups.map( (pickup, index) => {
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
    } else {
      pickups = 'Sorry, you are not authorized to see the contents';
    }

    return(
      <div>
        <div className="row">
          <div className="col s12">
            {pickups}
          </div>
        </div>
      </div>
    )
  }
}

export default Pickups
