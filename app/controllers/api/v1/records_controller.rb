class Api::V1::RecordsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def update
    if current_user
      if current_user.role === 'admin' || current_user.role === 'manager'
        data = JSON.parse(request.body.read)
        if !data['selectedOrder'].nil?
          selectedOrder = data['selectedOrder'].to_i
          if selectedOrder > 0
            new_order = selectedOrder
          elsif selectedOrder == 0
            new_order = nil
          else
            new_order = nil
          end
          record = Record.find(data['currentRecordId'])
          record.order = new_order
          record.save
          render json: { record_order: record.order, error: nil }
        end
        if !data['selectedDriverId'].nil?
          selectedDriverId = data['selectedDriverId'].to_i
          if selectedDriverId > 0
            new_driver = selectedDriverId
          elsif selectedDriverId == 0
            new_driver = nil
          else
            new_driver = nil
          end
          record = Record.find(data['currentRecordId'])
          record.driver_id = new_driver
          record.save
          render json: { record_driver: record.driver_id, error: nil }
        end
      else
        render json: { error: 'You are not authorized' }
      end
    else
      render json: { error: 'You are not authorized' }
    end
  end
end
