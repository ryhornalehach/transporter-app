import React from 'react';

const DriverTile = props => {

  let clients = props.clients.map( (client) => {
    return(
      <li key={client.id}>
        At: {client.pickup_time}.
        Name: <a href={`/pickups/${client.id}`}>{client.name}</a>.
        From: {client.pickup_address}, {client.pickup_city}.
        To: {client.dropoff_address}, {client.dropoff_city}
      </li>
    )
  })

  return (
    <div className="row">
      <div className="card horizontal">
        <div className="card-stacked">
          <div className="card-content">
            <span className="card-title">{props.driverInfo.first_name} {props.driverInfo.last_name}</span>
            <p><b>Phone: </b>{props.driverInfo.phone} &nbsp; <b>Email: </b>{props.driverInfo.email}</p>
            <p><b>Address: </b>{props.driverInfo.address}, {props.driverInfo.city}, {props.driverInfo.state} {props.driverInfo.zip}</p>
            <div className="card-action ">
              <h5>Clients: </h5>
              <ul>
                {clients}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DriverTile
