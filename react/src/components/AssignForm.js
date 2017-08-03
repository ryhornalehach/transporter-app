import React, { Component } from 'react';
import SelectField from './SelectField'

class AssignForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      assignedDriverText: 'N/A',
      assignedDriver: null,
      selectedDriverId: null,
      allDriversList: []
    }
    this.handleForm = this.handleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    let allDriversList = this.props.allDrivers
    let empty = { id: null, first_name: '--', last_name: '--' }
    allDriversList.unshift(empty);
    this.setState({ allDriversList: allDriversList })
    // debugger;

    if (this.props.assignedDriver) {
      let newText = `${this.props.assignedDriver.first_name} ${this.props.assignedDriver.last_name}`;
      this.setState({ assignedDriver: this.props.assignedDriver, assignedDriverText: newText, selectedDriverId: this.props.assignedDriver.id })
    }
  }

  handleChange(event) {
    this.setState({ selectedDriverId: event.target.value})
  }

  handleForm(event) {
    event.preventDefault();
    fetch(`/api/v1/users/${this.state.selectedDriverId}/`, {
      method: 'PATCH',
      credentials: "same-origin",
      body: JSON.stringify({ selectedDriverId: this.state.selectedDriverId, currentCleintId: this.props.currentCleintId })
    })
    .then(response => response.json())
    .then(body => {
      let name = `${body.first_name} ${body.last_name}`
      this.setState({ assignedDriverText: name })
    })
  }

  render() {

    let allDrivers = this.state.allDriversList.map( (driver) => {
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
