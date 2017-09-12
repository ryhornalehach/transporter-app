import React from 'react';
import AssignOrderForm from '../containers/AssignOrderForm';

const RecordTile = props => {
  let dropoffColorClass, pickupColorClass, form;
  if (props.currentClient.picked_up) {
    pickupColorClass = 'green'
  }
  if (props.currentClient.dropped_off) {
    dropoffColorClass = 'green'
  }

  form = <AssignOrderForm
              currentOrder={props.record.order}
          />

  return (
    <tr>
      <td>{form}</td>
      <td>{props.currentDriverName}</td>
      <td className={pickupColorClass}>{props.currentClient.pickup_time}</td>
      <td className={dropoffColorClass}>{props.currentClient.appointment_time}</td>
      <td>{props.currentClient.comment}</td>
      <td>{props.currentClient.name}</td>
      <td>{props.currentClient.pickup_address}</td>
      <td>{props.currentClient.pickup_city}</td>
      <td>{props.currentClient.dropoff_address}</td>
      <td>{props.currentClient.dropoff_city}</td>
    </tr>
  )
}

export default RecordTile
