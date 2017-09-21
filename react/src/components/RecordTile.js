import React from 'react';
import AssignOrderForm from '../containers/AssignOrderForm';
import AssignDriverForm from '../containers/AssignDriverForm';
import GroupAssign from '../containers/GroupAssign';

const RecordTile = props => {
  let dropoffColorClass, pickupColorClass, form;
  let group, driversForm, groupRecordsDisplay, groupColorClass, together;
  let currentOrder, currentDriverId;

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

    if (props.currentDriverId) {
      currentDriverId = props.currentDriverId;
    } else {
      currentDriverId = 0;
    }
    driversForm = <AssignDriverForm
                      currentDriverId={currentDriverId}
                      currentRecordId={props.record.id}
                      currentOrder={currentOrder}
                      currentPickupId={client.id}
                  />

    group = <GroupAssign
              text={props.groupFormText}
              color={props.groupFormColor}
              recordId={props.record.id}
              clientId={client.id}
              onClickGroup={props.onClickGroup}
              onClickCancel={props.onClickCancel}
              makeNewGroup={props.makeNewGroup}
              groupFormText={props.groupFormText}
              groupFormColor={props.groupFormColor}
              cancelButton={props.cancelButton}
              confirmButton={props.confirmButton}
            />

    return (
      <tr key={index}>
        <td className='form-6'>{form}</td>
        <td className='form-10'>{driversForm}</td>
        <td className={pickupColorClass}>{client.pickup_time}</td>
        <td className={dropoffColorClass}>{client.appointment_time}</td>
        <td className={groupColorClass}>{together}{client.comment}</td>
        <td>{group}</td>
        <td><a href={`/pickups/${client.id}`}>{client.name}</a></td>
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
