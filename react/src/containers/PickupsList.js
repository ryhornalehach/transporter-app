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
      drivers: [],
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
      this.setState({ showUser: body.auth, currentUser: body.user, drivers: body.allDrivers })
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

    if (this.state.showUser && !this.state.currentUser.admin) {
      // let counter = 0;

      pickups = this.state.records.map( (record, index) => {
        let currentClientsGroup = [];
        let cardClassName, groupText, groupColor;

        // if (pickup.picked_up && pickup.dropped_off) {
        //   cardClassName = 'dropped_off';
        // } else if (pickup.picked_up) {
        //   cardClassName = 'picked_up';
        // } else {
        //   counter += 1;
        //   if (counter > 1 && this.state.currentUser.admin !== true) {
        //     cardClassName = 'invisible';
        //   }
        // }



        this.state.pickups.forEach((pickup) => {
          if (record.pickup1_id === pickup.id || record.pickup2_id === pickup.id || record.pickup3_id === pickup.id) {
            currentClientsGroup.push(pickup)
          }
        })
        return(
          <PickupIndexTile
            currentClientsGroup={currentClientsGroup}
            groupText={groupText}
            groupColor={groupColor}
            key={index}
            id={record.id}
            record={record}
            cardClassName={cardClassName}
          />
        )
      })
    }
    // else if (this.state.showUser && this.state.currentUser.admin) {
    //   pickups = filteredClients.map( (pickup, index) => {
    //     let cardClassName, driverName;
    //     if (pickup.picked_up && pickup.dropped_off) {
    //       cardClassName = 'dropped_off';
    //     } else if (pickup.picked_up) {
    //       cardClassName = 'picked_up';
    //     }
    //     if (pickup.driver_id) {
    //       this.state.drivers.forEach ((driver) => {
    //         if (driver.id === pickup.driver_id) {
    //           driverName = `${driver.first_name} ${driver.last_name}`;
    //         }
    //       })
    //
    //     } else {
    //       driverName = 'N/A';
    //     }
    //     return(
    //       <AdminPickupIndexTile
    //         key={index}
    //         id={pickup.id}
    //         pickup={pickup}
    //         cardClassName={cardClassName}
    //         driverName={driverName}
    //       />
    //     )
    //   })
    // }
    else {
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
