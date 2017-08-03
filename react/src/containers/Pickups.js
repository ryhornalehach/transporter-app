import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PickupIndexTile from '../components/PickupIndexTile'
import SearchInput, {createFilter} from 'react-search-input'

const KEYS_TO_FILTERS = ['name', 'comment', 'pickup_city', 'pickup_address', 'dropoff_city', 'dropoff_address', 'pickup_time']

class Pickups extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pickups: [],
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
      this.setState({ showUser: body.auth, currentUser: body.user })
    })

    fetch('/api/v1/pickups',{
      credentials: "same-origin"
    })
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
    let filteredClients = this.state.pickups.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))

    if (this.state.showUser) {
      pickups = filteredClients.map( (pickup, index) => {
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
            <SearchInput className="search-input" onChange={this.searchUpdated} />
            {pickups}
          </div>
        </div>
      </div>
    )
  }
}

export default Pickups
