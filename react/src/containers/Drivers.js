import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DriverIndexTile from '../components/DriverIndexTile'

class Drivers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allDrivers: [],
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
      this.setState({ showUser: body.auth, currentUser: body.user, allDrivers: body.allDrivers })
    })
  }

  render() {
    let drivers;
    let roles = ['admin', 'manager'];
    if (this.state.showUser && roles.includes(this.state.currentUser.role)) {
      drivers = this.state.allDrivers.map( (driver, index) => {
        return(
          <DriverIndexTile
            key={index}
            id={driver.id}
            driver={driver}
          />
        )
      })
    } else {
      drivers = 'Sorry, you are not authorized to see the contents';
    }

    return(
      <div>
        <div className="row">
          <div className="col s12">
            {drivers}
          </div>
        </div>
      </div>
    )
  }
}

export default Drivers
