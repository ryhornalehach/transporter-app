import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PickupIndexTile from '../components/PickupIndexTile'
import AdminPickupIndexTile from '../components/AdminPickupIndexTile'
import SearchInput, {createFilter} from 'react-search-input'

const KEYS_TO_FILTERS = ['name', 'comment', 'pickup_city', 'pickup_address', 'dropoff_city', 'dropoff_address', 'pickup_time']

class Pickups extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pickups: [],
      drivers: [],
      currentUser: {},
      showUser: false,
      searchQuery: '',
      searchTerm: ''
    }
    this.searchUpdated = this.searchUpdated.bind(this);
  }

  searchUpdated (term) {
    this.setState({ searchTerm: term })
  }

  componentDidMount() {
    fetch('/api/v1/users',{
      credentials: "same-origin"
    })
    .then(response => response.json())
    .then(body => {
      this.setState({ showUser: body.auth, currentUser: body.user, drivers: body.allDrivers })
    })

    fetch('/api/v1/pickups',{
      credentials: "same-origin"
    })
    .then(response => response.json())
    .then(body => {
        this.setState({ pickups: body})
    })
  }

  render() {
    let pickups;
    let filteredClients = this.state.pickups.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))

    if (this.state.showUser && !this.state.currentUser.admin) {
      let counter = 0;
      pickups = filteredClients.map( (pickup, index) => {
        let cardClassName;
        let currentClientsGroup = [];
        if (pickup.picked_up && pickup.dropped_off) {
          cardClassName = 'dropped_off';
        } else if (pickup.picked_up) {
          cardClassName = 'picked_up';
        } else {
          counter += 1;
          if (counter > 1 && this.state.currentUser.admin !== true) {
            cardClassName = 'invisible';
          }
        }
        return(
          <PickupIndexTile
            currentClientsGroup={currentClientsGroup}
            key={index}
            id={pickup.id}
            pickup={pickup}
            cardClassName={cardClassName}
          />
        )
      })
    } else if (this.state.showUser && this.state.currentUser.admin) {
      pickups = filteredClients.map( (pickup, index) => {
        let cardClassName, driverName;
        if (pickup.picked_up && pickup.dropped_off) {
          cardClassName = 'dropped_off';
        } else if (pickup.picked_up) {
          cardClassName = 'picked_up';
        }
        if (pickup.driver_id) {
          this.state.drivers.forEach ((driver) => {
            if (driver.id === pickup.driver_id) {
              driverName = `${driver.first_name} ${driver.last_name}`;
            }
          })

        } else {
          driverName = 'N/A';
        }
        return(
          <AdminPickupIndexTile
            key={index}
            id={pickup.id}
            pickup={pickup}
            cardClassName={cardClassName}
            driverName={driverName}
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
            <SearchInput className="search-input" onChange={this.searchUpdated} />
            {pickups}
          </div>
        </div>
      </div>
    )
  }
}

export default Pickups
