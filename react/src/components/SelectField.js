import React from 'react';
import { Row, Input, Button, Icon } from 'react-materialize'

const SelectField = props => {

  return(
    <div>
        <Input
            s={parseInt(props.size)}
            name="driver"
            type='select'
            defaultValue={props.value}
            label={props.label}
            onChange={props.handleChange}
        >
            {props.allDrivers}
        </Input>
    </div>
  )
}

export default SelectField
