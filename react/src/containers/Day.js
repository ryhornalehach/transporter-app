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
      newGroupPickup3: null,
      groupFormText: '1st',
      groupFormColor: 'navbar-color-dark',
      cancelButton: false,
      confirmButton: false
    }
    this.makeNewGroup = this.makeNewGroup.bind(this);
    this.onClickGroup = this.onClickGroup.bind(this);
    this.onClickCancel = this.onClickCancel.bind(this);
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
      body: JSON.stringify({ method: 'group', recordId: this.state.newGroupRecordId, pickup2: this.state.newGroupPickup2, pickup3: this.state.newGroupPickup3 })
    })
  }

  onClickGroup(event) {
    if (event.target.innerText[0] == 1) {
      this.setState({ newGroupRecordId: event.target.name });
    } else if (event.target.innerText[0] == 2) {
      this.setState({ newGroupPickup2: event.target.name });
    } else if (event.target.innerText[0] == 3) {
      this.setState({ newGroupPickup3: event.target.name });
    } else if ((event.target.innerText.toUpperCase() == 'SPLIT')) {
      fetch(`/api/v1/days/${this.state.day.id}/`, {
        method: 'PATCH',
        credentials: "same-origin",
        body: JSON.stringify({ method: 'split', recordId: event.target.name })
      })
      this.setState({ newGroupRecordId: null, newGroupPickup2: null, newGroupPickup3: null,
        groupFormText: '1st', groupFormColor: 'navbar-color-dark', cancelButton: false,
        confirmButton: false });
    }
  }

  onClickCancel(event) {
    this.setState({ newGroupRecordId: null, newGroupPickup2: null, newGroupPickup3: null,
      groupFormText: '1st', groupFormColor: 'navbar-color-dark', cancelButton: false,
      confirmButton: false });
  }

  render() {
    let dayTile, records, currentDriverId;
    if (!this.state.error) {
      dayTile = new Date (this.state.day.date);
      records = this.state.records.map( (record, index) => {
        let currentClientsGroup = [];
        let cancelButton = this.state.cancelButton;
        let confirmButton = this.state.confirmButton;
        let groupFormText = this.state.groupFormText;
        let groupFormColor = this.state.groupFormColor;
        if (record.driver_id > 0) {
          currentDriverId = record.driver_id;
        } else {
          currentDriverId = 0;
        }

        if (this.state.newGroupRecordId == record.id) {
          groupFormText = '1st';
          groupFormColor = 'amber lighten-2';
          cancelButton = true;
        } else if (this.state.newGroupPickup2 == record.pickup1_id) {
          groupFormText = '2nd';
          groupFormColor = 'amber';
          confirmButton = true;
        } else if (this.state.newGroupPickup3 == record.pickup1_id) {
          groupFormText = '3nd';
          groupFormColor = 'amber';
          confirmButton = true;
        } else if (record.pickup2_id) {
          groupFormText = 'Split';
          groupFormColor = 'red accent-1';
        } else if (this.state.newGroupPickup3 !== null) {
          groupFormText = '--';
        } else if (this.state.newGroupPickup2 !== null) {
          groupFormText = '3rd';
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
            onClickCancel={this.onClickCancel}
            groupFormText={groupFormText}
            groupFormColor={groupFormColor}
            cancelButton={cancelButton}
            confirmButton={confirmButton}
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
