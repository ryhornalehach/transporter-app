import React, { Component } from 'react';
import SelectField from './SelectField'

class AssignForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      assignedDriverText: `${this.props.assignedDriver.first_name} ${this.props.assignedDriver.last_name}`,
      assignedDriver: this.props.assignedDriver,
      selectedDriverId: 0,
    }
    this.handleForm = this.handleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ selectedDriverId: event.target.value})
  }

  handleForm(event) {
    event.preventDefault();
    fetch(`/api/v1/users/${this.state.selectedDriverId}/`, {
      method: 'PATCH',
      credentials: "same-origin",
      body: JSON.stringify({ selectedDriverId: this.state.selectedDriverId, currentClientId: this.props.currentClientId })
    })
    .then(response => response.json())
    .then(body => {
      let name = `${body.first_name} ${body.last_name}`
      this.setState({ assignedDriverText: name })
    })
  }

  render() {


    let allDrivers = this.props.allDrivers.map( (driver) => {
      let name = `${driver.first_name} ${driver.last_name}`
      return (
          <option key={name} value={driver.id} >{name}</option>
      )
    })
    return(
      <div>
        <div className="large-text"><b>Assigned driver: </b>{this.state.assignedDriverText}</div>
        <form className="form" onSubmit={this.handleForm}>
          <SelectField
              value = {this.state.selectedDriverId}
              handleChange={this.handleChange}
              allDrivers={allDrivers}
          />
          <input type="submit" name="Assign Driver" value="Assign Driver" className="btn waves-effect waves-light navbar-color-dark" />
        </form>
      </div>
    )
  }
}

export default AssignForm
