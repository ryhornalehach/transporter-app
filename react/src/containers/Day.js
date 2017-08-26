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
          `record # ${index}; client id = ${record.pickup1_id}`
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
      </div>
    )
  }
}

export default Day
