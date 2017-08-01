import React from 'react';
import { Row, Input, Button, Icon } from 'react-materialize'

const SelectField = props => {

  return(
    <div>
        <Input
            s={12}
            name="driver"
            type='select'
            defaultValue={props.value}
            label="Assign new driver"
            onChange={props.handleChange}
        >
            {props.allDrivers}
        </Input>
    </div>
  )
}

export default SelectField
