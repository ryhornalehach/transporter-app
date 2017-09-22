class Api::V1::PickupsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def is_driver(driver_id, pickup_id)
    list_of_pickup_ids = []
    list_of_records = Record.where(driver_id: driver_id)
    list_of_records.each do |record|
      list_of_pickup_ids << record.pickup1_id
      list_of_pickup_ids << record.pickup2_id
      list_of_pickup_ids << record.pickup3_id
    end
    list_of_pickup_ids.uniq!
    list_of_pickup_ids.delete_if {|id| id == nil }
    list_of_pickup_ids.delete_if {|id| id == 0 }
    if list_of_pickup_ids.include?(pickup_id)
      return true
    else
      return false
    end
  end

  def index
    if current_user
      if current_user.role == 'admin' || current_user.role == 'manager'
        list_of_pickups = Pickup.order(pickup_time: :asc)
        render json: { pickups: list_of_pickups }
      else
        list_of_pickup_ids = []
        list_of_pickups = []
        list_of_records = Record.where(driver_id: current_user.id).order(order: :asc)
        list_of_records.each do |record|
          list_of_pickup_ids << record.pickup1_id
          list_of_pickup_ids << record.pickup2_id
          list_of_pickup_ids << record.pickup3_id
        end
        list_of_pickup_ids.uniq!
        list_of_pickup_ids.delete_if {|id| id == nil }
        list_of_pickup_ids.delete_if {|id| id == 0 }
        list_of_pickup_ids.each do |id|
            list_of_pickups << Pickup.find(id)
        end
        render json: { pickups: list_of_pickups, records: list_of_records }
      end
    else
      render json: { error: 'You are not authorized' }
    end
  end

  def show
    if current_user
    pickup = Pickup.find(params[:id])
      if is_driver(current_user.id, pickup.id) || current_user.role == 'admin' || current_user.role == 'manager'
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
      if current_user
          if is_driver(current_user.id, pickup.id) || current_user.role == 'admin' || current_user.role == 'manager'
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
          else
              render json: { 'error': 'You are not authorized' }
          end
      else
          render json: { 'error': 'You are not authorized' }
      end
  end
end
