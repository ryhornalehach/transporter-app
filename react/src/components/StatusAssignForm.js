import React from 'react'

const StatusAssignForm = props => {
  return (
    <div>
      <p>Set new status for the client:</p>
      <input
        name='pickupStatus'
        onChange={props.handlePickupStatus}
        type='text'
        value={props.pickupStatus}
      />

      <input
        type="submit"
        onClick={props.handleStatusButton}
        className="btn waves-effect waves-light navbar-color-dark"
        value="Set new status "
      />
    </div>
  )
}

export default StatusAssignForm
