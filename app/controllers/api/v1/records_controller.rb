class Api::V1::RecordsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def update
    if current_user
      if current_user.role === 'admin' || current_user.role === 'manager'
        data = JSON.parse(request.body.read)
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
      else
        render json: { error: 'You are not authorized' }
      end
    else
      render json: { error: 'You are not authorized' }
    end
  end
end
