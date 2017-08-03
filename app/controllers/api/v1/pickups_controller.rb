class Api::V1::PickupsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    if current_user
      render json: Pickup.order(pickup_time: :asc)
    else
      render json: { error: 'You are not authorized' }
    end
  end

  def show
    if current_user
    pickup = Pickup.find(params[:id])
      if pickup.driver_id == current_user.id || current_user.role == 'admin' || current_user.role == 'manager'
        driver = pickup.driver
        render json: { 'pickup': pickup, 'driver': driver }
      else
        render json: { error: 'You are not authorized' }
      end
    else
      render json: { error: 'You are not authorized' }
    end
  end

  def update
    data = JSON.parse(request.body.read)
    current_state = data['state']
    pickup = Pickup.find(params[:id])
    if pickup.driver_id != current_user.id && current_user.role != 'admin' && current_user.role != 'manager'
      render json: { 'error': 'You are not authorized' }
    else
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
end
