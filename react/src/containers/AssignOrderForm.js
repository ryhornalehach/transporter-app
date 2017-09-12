import React, { Component } from 'react';
import SelectField from '../components/SelectField'
import { Row, Input, Button, Icon } from 'react-materialize'

class AssignOrderForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    let ordersMap;
    let orders = [1, 2, 3, 4];
    let iconConfirm = <i className="material-icons">check_circle</i>;

    ordersMap = orders.map ((order) => {
      return (
        <option key={order} value={order} >{order}</option>
      )
    })
    return(
      <div className='row no-margin'>
        <form className="form" >
        <Input
            s={6}
            name="order"
            type='select'
            defaultValue={this.props.currentOrder}
        >
            {ordersMap}
        </Input>
        <button
          className="btn waves-effect waves-light navbar-color-dark s6"
          type="submit"
          name="Order">
            {iconConfirm}
        </button>
        </form>
      </div>
    )
  }
}

export default AssignOrderForm
