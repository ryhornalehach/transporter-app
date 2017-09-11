import React from 'react';

const RecordTile = props => {
  let dropoffColorClass, pickupColorClass;
  if (props.currentClient.picked_up) {
    pickupColorClass = 'green'
  }
  if (props.currentClient.dropped_off) {
    dropoffColorClass = 'green'
  }
  return (
    <tr>
      <td>{props.record.order}</td>
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
