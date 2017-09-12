import React from 'react';
import AssignOrderForm from '../containers/AssignOrderForm';

const RecordTile = props => {
  let dropoffColorClass, pickupColorClass, form, groupRecordsDisplay, groupColorClass, together, currentOrder;

  groupRecordsDisplay = props.currentClientsGroup.map((client, index) => {
    if (client.picked_up) {
      pickupColorClass = 'green'
    }
    if (client.dropped_off) {
      dropoffColorClass = 'green'
    }
    if (props.currentClientsGroup.length > 1 && index === 0) {
      groupColorClass = 'amber lighten-2';
      together = 'Group/ ';
    } else if (props.currentClientsGroup.length > 1 && index >= 1) {
      groupColorClass = 'amber';
      together = 'Together/ ';
    }
    if (props.record.order) {
      currentOrder = props.record.order;
    } else {
      currentOrder = 20;
    }
    form = <AssignOrderForm
              currentRecordId={props.record.id}
              currentOrder={currentOrder}
            />

    return (
      <tr key={index}>
        <td>{form}</td>
        <td>{props.currentDriverName}</td>
        <td className={pickupColorClass}>{client.pickup_time}</td>
        <td className={dropoffColorClass}>{client.appointment_time}</td>
        <td className={groupColorClass}>{together}{client.comment}</td>
        <td>{client.name}</td>
        <td>{client.pickup_address}</td>
        <td>{client.pickup_city}</td>
        <td>{client.dropoff_address}</td>
        <td>{client.dropoff_city}</td>
      </tr>
    )
  })

  return (
    <tbody>
      {groupRecordsDisplay}
    </tbody>
  )
}

export default RecordTile
