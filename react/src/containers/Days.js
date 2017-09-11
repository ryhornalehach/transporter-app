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
      days = this.state.allDays[0].date;
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
