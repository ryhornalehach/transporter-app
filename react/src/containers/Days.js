import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Days extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allDays: [],
      error: null
    }
  }

  componentDidMount() {
    fetch('/api/v1/days',{
      credentials: "same-origin"
    })
    .then(response => response.json())
    .then(body => {
      this.setState({ allDays: body.allDays, error: body.error })
    })
  }

  render() {
    let days;
    if (this.state.allDays[0]) {
      days = this.state.allDays.map((day, index) => {
        let dayTile = new Date (day.date).toUTCString();  // converting the date to Date object and to UTC string
        let index2 = dayTile.indexOf('00:');            // getting the index of an element where to cut the date string
        dayTile = dayTile.substring(0, index2);         // cutting the date string

        return (
          <li key={index}><a href={`/days/${day.id}`}>{dayTile}</a><span> - [{day.status}]</span><a href={`/days/${day.id}/edit`}> Edit</a></li>
        )
      })
    } else {
      days = 'Sorry, you are not authorized to see the contents';
    }

    return(
      <div>
        <div className="row">
          <div className="col s12">
            {days}
          </div>
        </div>
      </div>
    )
  }
}

export default Days
