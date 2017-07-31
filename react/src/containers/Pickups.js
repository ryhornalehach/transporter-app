import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PickupIndexTile from '../components/PickupIndexTile'

class Pickups extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pickups: [],
      showUser: false
    }
  }

  componentDidMount() {
    fetch('/api/v1/pickups')
    .then(response => response.json())
    .then(body => {
      this.setState({ pickups: body})
    })

    fetch('/api/v1/users',{
      credentials: "same-origin"
    })
    .then(response => response.json())
    .then(body => {
      this.setState({ showUser: body.auth })
    })
  }

  render() {
    let pickups = this.state.pickups.map( (pickup, index) => {
      return(
        <PickupIndexTile
          key={index}
          id={pickup.id}
          pickup={pickup}
        />
      )
    })

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
