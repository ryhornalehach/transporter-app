import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PickupIndexTile from '../components/PickupIndexTile'
import AdminPickupIndexTile from '../components/AdminPickupIndexTile'

class PickupsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pickups: [],
      records: [],
      currentUser: {},
      showUser: false,
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

    fetch('/api/v1/pickups',{
      credentials: "same-origin"
    })
    .then(response => response.json())
    .then(body => {
        this.setState({ pickups: body.pickups, records: body.records })
    })
  }

  render() {
    let pickups;

    if (this.state.showUser) {
      let counter = 0;

      pickups = this.state.records.map( (record, index) => {
        let currentClientsGroup = [];
        let cardClassName;

        if (counter > 0) {
          cardClassName = 'invisible';
        }

        this.state.pickups.forEach((pickup) => {
          if (record.pickup1_id === pickup.id || record.pickup2_id === pickup.id || record.pickup3_id === pickup.id) {
            currentClientsGroup.push(pickup)
            if (pickup.status && pickup.status.includes("cancel")) {

            } else if (!pickup.dropped_off) {
              counter += 1;
            }
          }
        })

        return(
          <PickupIndexTile
            currentClientsGroup={currentClientsGroup}
            key={index}
            id={record.id}
            record={record}
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

export default PickupsList
