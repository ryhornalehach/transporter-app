class Api::V1::PickupsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    render json: Pickup.all
  end

  def show
    pickup = Pickup.find(params[:id])
    render json: pickup
  end

  def update
    data = JSON.parse(request.body.read)
    current_state = data['state']
    pickup = Pickup.find(params[:id])
    if pickup.driver_id != current_user.id
      render json: { 'error': 'You are not authorized'}
    end
    if data['stateType'] === 'picked_up'
      pickup.picked_up = current_state
      if current_state == false
        pickup.dropped_off = current_state
      end
      pickup.save
      render json: pickup
    elsif data['stateType'] === 'dropped_off'
      pickup.dropped_off = current_state
      pickup.save
      render json: pickup
    end
  end
end
