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
      error: null
    }
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
  render() {
    let dayTile, records, currentDriverName;
    console.log('step1');
    if (!this.state.error) {
      dayTile = new Date (this.state.day.date);
      console.log('step2');
      records = this.state.records.map( (record, index) => {
        console.log('step records map');
        let currentClientsGroup = [];
        this.state.drivers.forEach((driver) =>{
          if (driver.id === record.driver_id ) {
            currentDriverName = `${driver.first_name} ${driver.last_name}`
            console.log('step driver name');
          }
        })
        this.state.pickups.forEach((pickup) => {
          console.log('step5');
          if (record.pickup1_id === pickup.id || record.pickup2_id === pickup.id || record.pickup3_id === pickup.id) {
            currentClientsGroup.push(pickup)
            console.log('step group');
          }
        })
        console.log('step return');
        return(
          <RecordTile
            key={index}
            record={record}
            currentClientsGroup={currentClientsGroup}
            currentDriverName={currentDriverName}
          />
        )
      })
    } else {
      console.log('step else');
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
                <th>Name</th>
                <th>Pickup Address</th>
                <th>Pickup City</th>
                <th>Dropoff Address</th>
                <th>Dropoff City</th>
            </tr>
          </thead>
          Hi there
            {records}
        </table>


      </div>
    )
  }
}

export default Day
