import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Input, Button, Icon } from 'react-materialize'

class DayEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedStatus: 'future',
      day: {}
    }
    this.handleChange = this.handleChange.bind(this)  //binding the functions
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    let dayId = this.props.match.params.id
    fetch(`/api/v1/days/${dayId}`,{
      credentials: "same-origin"
    })
    .then(response => response.json())
    .then(data => {
      this.setState({ selectedStatus: data.day.status, day: data.day })
    })
  }

  handleChange(event) {    // function to handle the text field.
    this.setState({ selectedStatus: event.target.value })  // setting the state with the value of the field
  }

  handleSubmit(event) {     // function to handle the submit of the form
    event.preventDefault();   // preventing the default action - page reload
    fetch(`/api/v1/days/${this.state.day.id}/`, {
      method: 'PATCH',
      credentials: "same-origin",
      body: JSON.stringify({ method: 'status', status: this.state.selectedStatus, dayId: this.state.day.id })
    })
  }

  render() {
    let statusMap;
    let statuses = ['current', 'future', 'closed'];   // array of possible statuses
    let dateObject = new Date (this.state.day.date).toUTCString();  // converting the date to Date object and to UTC string
    let index = dateObject.indexOf('00:');  // getting the index of an element where to cut the date string
    dateObject = dateObject.substring(0, index);  // cutting the date string

    statusMap = statuses.map ((status) => {
      return (
        <option key={status} value={status} >{status}</option>  // creating options for the select field
      )
    })

    return(
      <div>
        <div className="row">
          <div className="col s12">
            <h5>Change day status for {dateObject}</h5>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m6">
              <form className="form" onSubmit={this.handleSubmit}>
              <Input
                  s={12}
                  name="status"
                  type='select'
                  value={this.state.selectedStatus}
                  onChange={this.handleChange}
              >
                  {statusMap}
              </Input>
              <button
                className="btn waves-effect waves-light navbar-color-dark s6"
                type="submit"
                name="Submit">
                  Submit
              </button>
              </form>
          </div>
        </div>
      </div>
    )
  }
}

export default DayEdit
