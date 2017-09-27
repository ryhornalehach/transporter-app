import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DriverTile from '../components/DriverTile';

class Driver extends Component {
  constructor(props) {
    super(props)
    this.state = {
      driverInfo: {},
      driverId: null,
      currentUser: {},
      clients: [],
      error: null
    }
  }

  componentDidMount() {
    let idRegex = /[0-9]+\/{0,1}$/
    let driverId = this.props.location.pathname.match(idRegex)[0]
    fetch(`/api/v1/users/${driverId}`,{
      credentials: "same-origin"
    })
    .then(response => response.json())
    .then(response => {
      this.setState({ clients: response.clients, currentUser: response.current_user, driverId: response.driver.id, driverInfo: response.driver, error: response.error })
    })
  }

  render() {
    let driverTile;
    if (this.state.currentUser.admin) {
      console.log('yes')
      driverTile = <DriverTile
                        driverInfo={this.state.driverInfo}
                        clients={this.state.clients}
                  />
    } else {
      console.log('no')
      driverTile = 'You are not authorized'
    }



    return(
      <div>
        <div className="red-text">{this.state.error}</div>
        {driverTile}
        <div className="row">
          <div className="col s12 l6">
            <Link to='/drivers' className="btn waves-effect waves-light navbar-color-dark">Back to all drivers</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Driver
