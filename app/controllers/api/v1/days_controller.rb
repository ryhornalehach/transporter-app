class Api::V1::DaysController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    if current_user
      if current_user.role === 'admin' || current_user.role === 'manager'
        allDays = Day.all.reverse
        render json: { allDays: allDays, error: nil }
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
        records = Record.where(day_id: day.id).order(order: :asc)
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
        record = Record.find(data['recordId'].to_i)
        record.pickup2_id = data['pickup2'].to_i
        record.pickup3_id = data['pickup3'].to_i
        record.save
        render json: { saved_record: record, error: nil }
      else
        render json: { error: 'You are not authorized' }
      end
    else
      render json: { error: 'You are not authorized' }
    end
  end

end
