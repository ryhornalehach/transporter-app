import React, { Component } from 'react';

class AssignDrivers extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }

  }

  componentDidMount() {
  }

  render() {
    let assignedDriverText;
    if (this.props.assignedDriver) {
      assignedDriverText = `${this.props.assignedDriver.first_name} ${this.props.assignedDriver.last_name}`;
    } else {
      assignedDriverText = 'N/A'
    }

    return(
      <div>
        <b>Assigned driver: </b>{assignedDriverText}
      </div>
    )
  }
}

export default AssignDrivers
