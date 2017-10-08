class Api::V1::DaysController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    if current_user
      if current_user.role === 'admin' || current_user.role === 'manager'
        allDays = Day.all.reverse
        openDays =[]
        openDays << Day.where(status: 'current')
        openDays << Day.where(status: 'future')
        render json: { allDays: allDays, openDays: openDays, error: nil }
      elsif current_user.role === 'driver'
        render json: { allDays: nil, error: 'You are not authorized' }
      end
    else
      render json: { allDays: nil, error: 'You are not authorized' }
    end
  end

  def show
    if current_user
      if current_user.role === 'admin' || current_user.role === 'manager'
        day = Day.find(params[:id])
        records = Record.where(day_id: day.id).order({driver_id: :asc}, {order: :asc})
        render json: { day: day, records: records, drivers: User.where(role: 'driver'), pickups: Pickup.all, error: nil }
      else
        render json: { day: nil, records: nil, error: 'You are not authorized' }
      end
    else
      render json: { day: nil, records: nil, error: 'You are not authorized' }
    end
  end

  def update
    if current_user
      if current_user.role === 'admin' || current_user.role === 'manager'
        data = JSON.parse(request.body.read)
        if data['method'] === 'group'
          record = Record.find(data['recordId'].to_i)
          record.pickup2_id = data['pickup2'].to_i
          record.pickup3_id = data['pickup3'].to_i
          record.save
          Record.where(pickup1_id: record.pickup2_id).destroy_all
          render json: { saved_record: record, error: nil }
        elsif data['method'] === 'split'
          record = Record.find(data['recordId'].to_i)
          Record.create(order: record.order, pickup1_id: record.pickup2_id, driver_id: record.driver_id, day_id: record.day_id)
          if !record.pickup3_id.nil? && record.pickup3_id > 0
            Record.create(order: record.order, pickup1_id: record.pickup3_id, driver_id: record.driver_id, day_id: record.day_id)
          end
          record.pickup2_id = nil
          record.pickup3_id = nil
          record.save
        elsif data['method'] === 'status'
          day = Day.find(data['dayId'])
          day.status = data['status']
          day.save!
        end
      else
        render json: { error: 'You are not authorized' }
      end
    else
      render json: { error: 'You are not authorized' }
    end
  end

end
