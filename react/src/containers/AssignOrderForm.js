import React, { Component } from 'react';
import SelectField from '../components/SelectField'
import { Row, Input, Button, Icon } from 'react-materialize'

class AssignOrderForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOrder: this.props.currentOrder
    }
    this.assignNewOrder = this.assignNewOrder.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  assignNewOrder(event) {
    event.preventDefault();
    fetch(`/api/v1/records/${this.state.selectedOrder}/`, {
      method: 'PATCH',
      credentials: "same-origin",
      body: JSON.stringify({ selectedOrder: this.state.selectedOrder, currentRecordId: this.props.currentRecordId })
    })
  }

  handleChange(event) {
    this.setState({ selectedOrder: event.target.value})
  }

  render() {

    let ordersMap;
    let orders = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    let iconConfirm = <i className="material-icons">check_circle</i>;

    ordersMap = orders.map ((order) => {
      return (
        <option key={order} value={order} >{order}</option>
      )
    })
    return(
      <div className='row no-margin'>
        <form className="form" onSubmit={this.assignNewOrder}>
        <Input
            s={6}
            name="order"
            type='select'
            defaultValue={this.props.currentOrder}
            onChange={this.handleChange}
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
