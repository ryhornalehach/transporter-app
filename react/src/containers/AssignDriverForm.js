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
      this.setState({ allDrivers: body.allDrivers })
    })
  }

  render() {

    let driversMap;
    let empty = { id: 0, first_name: '--', last_name: '--' };
    let drivers = this.state.allDrivers;
    drivers.unshift(empty);
    let iconConfirm = <i className="material-icons">check_circle</i>;

    driversMap = drivers.map ((driver) => {
      let name = `${driver.first_name} ${driver.last_name}`
      return (
        <option key={`${name}-${driver.id}`} value={driver.id} >{name}</option>
      )
    })

    return(
      <div className='row no-margin'>
        <form className="form" onSubmit={this.assignNewDriver}>
        <SelectField
            value = {this.props.currentDriverId}
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
