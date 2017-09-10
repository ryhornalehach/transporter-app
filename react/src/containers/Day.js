import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Day extends Component {
  constructor(props) {
    super(props)
    this.state = {
      day: {},
      records: [],
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
      this.setState({ day: response.day, records: response.records, error: response.error })
    })
  }

  render() {
    let dayTile, records;
    if (!this.state.error) {
      dayTile = new Date (this.state.day.date);
      records = this.state.records.map( (record, index) => {
        return(
          `record # ${index}; client id = ${record.pickup1_id} ; `
        )
      })
    } else {
      dayTile = 'You are not authorized';
    }

    return(
      <div>
        <div className="red-text">{this.state.error}</div>
        {dayTile.toDateString()}
        <p>{records}</p>

        <table className="bordered">
          <thead>
            <tr>
                <th>Order#</th>
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

          <tbody>
            <tr>
              <td>1</td>
              <td>6.00</td>
              <td>6.45</td>
              <td>Back door</td>
              <td>Arnold Schwarzenegger</td>
              <td>88 Main st.</td>
              <td>Fitchburg</td>
              <td>380 Brookline ave.</td>
              <td>Boston</td>
            </tr>
            <tr>
              <td>2</td>
              <td>7.00</td>
              <td>7.45</td>
              <td>Call before</td>
              <td>Bruce Willis</td>
              <td>11 Summer ave</td>
              <td>Everett</td>
              <td>88 E.Newton st.</td>
              <td>Boston</td>
            </tr>
            <tr>
              <td>3</td>
              <td>7.30</td>
              <td>8.30</td>
              <td>Service dog</td>
              <td>Chuck Norris</td>
              <td>248 Galvin st.</td>
              <td>Revere</td>
              <td>77 Bridge ave.</td>
              <td>Lynn</td>
            </tr>
          </tbody>
        </table>


      </div>
    )
  }
}

export default Day
