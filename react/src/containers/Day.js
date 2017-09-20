import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RecordTile from '../components/RecordTile'

class Day extends Component {
  constructor(props) {
    super(props)
    this.state = {
      day: {},
      records: [],
      drivers: [],
      pickups: [],
      error: null,
      newGroupRecordId: null,
      newGroupPickup2: null,
      newGroupPickup3: null
    }
    this.makeNewGroup = this.makeNewGroup.bind(this);
    this.onClickGroup = this.onClickGroup.bind(this);
  }

  componentDidMount() {
    let idRegex = /[0-9]+\/{0,1}$/
    let dayId = this.props.location.pathname.match(idRegex)[0]
    fetch(`/api/v1/days/${dayId}`,{
      credentials: "same-origin"
    })
    .then(response => response.json())
    .then(response => {
      this.setState({ day: response.day, records: response.records, drivers: response.drivers, pickups: response.pickups, error: response.error })
    })
  }

  makeNewGroup(event) {
    event.preventDefault();
    fetch(`/api/v1/days/${this.state.day.id}/`, {
      method: 'PATCH',
      credentials: "same-origin",
      body: JSON.stringify({ recordId: this.state.newGroupRecordId, pickup2: this.state.newGroupPickup2, pickup3: this.state.newGroupPickup3 })
    })
  }

  onClickGroup(event) {
    if (event.target.innerText[0] == 1) {
      this.setState({ newGroupRecordId: event.target.name });
    } else if (event.target.innerText[0] == 2) {
      this.setState({ newGroupPickup2: event.target.name });
    } else if (event.target.innerText[0] == 3) {
      this.setState({ newGroupPickup3: event.target.name });
    }
    console.log(`newGroupRecordId = ${this.state.newGroupRecordId}; newGroupPickup2 = ${this.state.newGroupPickup2} ; newGroupPickup3 = ${this.state.newGroupPickup3}`)
  }

  render() {
    let dayTile, records, currentDriverId;
    if (!this.state.error) {
      dayTile = new Date (this.state.day.date);
      records = this.state.records.map( (record, index) => {
        let currentClientsGroup = [];
        let groupFormText = '1st';
        let groupFormColor = 'navbar-color-dark';
        if (record.driver_id > 0) {
          currentDriverId = record.driver_id;
        } else {
          currentDriverId = 0;
        }

        if (this.state.newGroupRecordId == record.id) {
          groupFormText = '1st';
          groupFormColor = 'amber lighten-2';
        } else if (this.state.newGroupRecordId !== null) {
          groupFormText = '2nd';
        }

        this.state.pickups.forEach((pickup) => {
          if (record.pickup1_id === pickup.id || record.pickup2_id === pickup.id || record.pickup3_id === pickup.id) {
            currentClientsGroup.push(pickup)
          }
        })
        return(
          <RecordTile
            key={index}
            record={record}
            currentClientsGroup={currentClientsGroup}
            currentDriverId={currentDriverId}
            makeNewGroup={this.makeNewGroup}
            onClickGroup={this.onClickGroup}
            groupFormText={groupFormText}
            groupFormColor={groupFormColor}
          />
        )
      })
    } else {
      dayTile = 'You are not authorized';
    }

    return(
      <div>
        <div className="red-text">{this.state.error}</div>
        {dayTile.toDateString()}

        <table className="bordered">
          <thead>
            <tr>
                <th>Order#</th>
                <th>Driver</th>
                <th>Pickup Time</th>
                <th>Appointment Time</th>
                <th>Comments</th>
                <th>Group</th>
                <th>Name</th>
                <th>Pickup Address</th>
                <th>Pickup City</th>
                <th>Dropoff Address</th>
                <th>Dropoff City</th>
            </tr>
          </thead>
            {records}
        </table>
      </div>
    )
  }
}

export default Day
