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
        list_of_pickup_ids = []
        list_of_pickups = []
        today = Day.where(status: 'current')
        list_of_records = Record.where(driver_id: current_user.id, day_id: today).order(order: :asc)
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
    else
      render json: { error: 'You are not authorized' }
    end
  end

  def show
    if current_user
    pickup = Pickup.find(params[:id])
      if is_driver(current_user.id, pickup.id) || current_user.admin
        record = Record.where('pickup1_id = ? or pickup2_id = ? or pickup3_id = ?', pickup.id, pickup.id, pickup.id)[0]
        if pickup.id == record.pickup1_id
          if !record.pickup2_id || record.pickup2_id == 0
            group_status = 'ok'
          elsif !record.pickup3_id && Pickup.find(record.pickup2_id).picked_up
            group_status = 'ok'
          elsif record.pickup3_id == 0 && Pickup.find(record.pickup2_id).picked_up
            group_status = 'ok'
          elsif record.pickup3_id > 0 && Pickup.find(record.pickup3_id).picked_up
            group_status = 'ok'
          else
            group_status = 'pickup_only'
          end
        elsif pickup.id == record.pickup2_id
          if Pickup.find(record.pickup1_id).picked_up && !record.pickup3_id
            group_status = 'ok'
          elsif Pickup.find(record.pickup1_id).picked_up && record.pickup3_id == 0
            group_status = 'ok'
          elsif record.pickup3_id > 0 && Pickup.find(record.pickup3_id).picked_up
            group_status = 'ok'
          elsif record.pickup3_id > 0 && !Pickup.find(record.pickup3_id).picked_up
            group_status = 'pickup_only'
          else
            group_status = 'not_yet'
          end
        elsif pickup.id == record.pickup3_id
          if Pickup.find(record.pickup1_id).picked_up && Pickup.find(record.pickup2_id).picked_up
            group_status = 'ok'
          else
            group_status = 'not_yet'
          end
        end
        render json: { 'pickup': pickup, 'group_status': group_status }
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
              if data['stateType'] === 'picked_up'      # marking client as picked up
                  pickup.picked_up = current_state
                  if current_state == false
                      pickup.dropped_off = current_state
                  end
                  pickup.save
                  render json: pickup
              elsif data['stateType'] === 'dropped_off' # marking client as dropped off
                  pickup.dropped_off = current_state
                  pickup.save
                  render json: pickup
              elsif data['stateType'] === 'statusChange' # changing the status of the cilent
                  pickup.status = data['pickupStatus']
                  pickup.save
                  render json: pickup
              elsif data['stateType'] === 'edit'  # manual edit of the clien's info
                  pickup.update(name: data['currentPickup']['name'], comment: data['currentPickup']['comment'],
                      pickup_address: data['currentPickup']['pickupAddress'], pickup_city: data['currentPickup']['pickupCity'],
                      dropoff_address: data['currentPickup']['dropoffAddress'], dropoff_city: data['currentPickup']['dropoffCity'],
                      pickup_time: data['currentPickup']['pickupTime'], appointment_time: data['currentPickup']['appointmentTime'],
                      phone: data['currentPickup']['phone'])
                  pickup.save
                  render json: { 'notice': 'Client Info Updated' }
              end
          else
              render json: { 'error': 'You are not authorized' }
          end
      else
          render json: { 'error': 'You are not authorized' }
      end
  end

  def create    # manual creation of new pickups
      data = JSON.parse(request.body.read)
      binding.pry
      if current_user
          if current_user.admin   # verifying the user
              new_pickup = Pickup.new( name: data['name'], pickup_time: data['pickupTime'],
                appointment_time: data['appointmentTime'], phone: data['phone'],
                comment: data['comment'], pickup_address: data['pickupAddress'],
                pickup_city: data['pickupCity'], dropoff_address: data['dropoffAddress'],
                dropoff_city: data['dropoffCity'] )
              if new_pickup.save  # creating new Pickup and verifying that it is saved successfully
                Record.create(day_id: data['dayId'], pickup1_id: new_pickup.id ) # creating the Record corresponding to new Pickup
                render json: { 'notice': 'User Info Updated' }
              else
                render json: { 'error': 'Error while saving new pickup' }
              end
          else
              render json: { 'error': 'You are not authorized' }
          end
      else
          render json: { 'error': 'You are not authorized' }
      end
  end
end
