import React, { Component } from 'react';
import SelectField from '../components/SelectField'
import { Row, Input, Button, Icon } from 'react-materialize'

class AssignDriverForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedDriverId: this.props.currentDriverId,
      allDrivers: []
    }
    this.assignNewDriver = this.assignNewDriver.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  assignNewDriver(event) {
    event.preventDefault();
    fetch(`/api/v1/records/${this.state.selectedDriver}/`, {
      method: 'PATCH',
      credentials: "same-origin",
      body: JSON.stringify({ selectedDriverId: this.state.selectedDriverId, currentRecordId: this.props.currentRecordId })
    })
  }

  handleChange(event) {
    this.setState({ selectedDriverId: event.target.value})
  }

  componentDidMount() {
    fetch('/api/v1/users',{
      credentials: "same-origin"
    })
    .then(response => response.json())
    .then(body => {
      let allDriversList = body.allDrivers
      let empty = { id: 0, first_name: '--', last_name: '--' }
      allDriversList.unshift(empty);
      this.setState({ allDrivers: allDriversList })
    })
  }

  render() {

    let driversMap;
    let counter = 0;
    let iconConfirm = <i className="material-icons">check_circle</i>;

    driversMap = this.state.allDrivers.map ((driver) => {
      let name = `${driver.first_name} ${driver.last_name}`
      counter++;
      return (
        <option key={`${driver.id}-${this.props.currentPickupId}-${counter}`} value={driver.id} >{name}</option>
      )
    })

    return(
      <div className='row no-margin'>
        <form className="form" onSubmit={this.assignNewDriver}>
        <SelectField
            size='12'
            value={this.props.currentDriverId}
            handleChange={this.handleChange}
            allDrivers={driversMap}
            label={null}
        />
        <button
          className="btn waves-effect waves-light navbar-color-dark s6"
          type="submit"
          name="Driver">
            {iconConfirm}
        </button>
        </form>
      </div>
    )
  }
}

export default AssignDriverForm
