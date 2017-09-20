import React from 'react';
import SelectField from './SelectField'

const AssignForm = props => {
  let allDrivers = props.allDrivers.map( (driver) => {
    let name = `${driver.first_name} ${driver.last_name}`
    return (
        <option key={name} value={driver.id} >{name}</option>
    )
  })

  return(
    <div>
      <form className="form" onSubmit={props.handleForm}>
        <SelectField
            value = {props.selectedDriverId}
            handleChange={props.handleChange}
            allDrivers={allDrivers}
            label='Assign new driver'
        />
        <input type="submit" name="Assign Driver" value="Assign Driver" className="btn waves-effect waves-light navbar-color-dark" />
      </form>
    </div>
  )
}

export default AssignForm
