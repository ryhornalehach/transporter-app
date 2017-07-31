import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PickupIndexTile from '../components/PickupIndexTile'

class Pickups extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pickups: [],
      currentUser: {},
      showUser: false
    }
  }

  componentDidMount() {
    fetch('/api/v1/users',{
      credentials: "same-origin"
    })
    .then(response => response.json())
    .then(body => {
      this.setState({ showUser: body.auth, currentUser: body.user })
    })

    fetch('/api/v1/pickups')
    .then(response => response.json())
    .then(body => {
      if (this.state.currentUser.role === 'admin' || this.state.currentUser.role === 'manager') {
        this.setState({ pickups: body})
      } else {
        let selectedPickups = [];
        body.forEach((pickup) => {
          if (pickup.driver_id === this.state.currentUser.id) {
            selectedPickups.unshift(pickup)
          }
        })
        this.setState({ pickups: selectedPickups})
      }
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
