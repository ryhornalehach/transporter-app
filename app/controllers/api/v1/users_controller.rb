class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    if current_user
      if current_user.role === 'admin' || current_user.role === 'manager'
        allDrivers = []
        User.where(role: 'driver').each do |user|
          allDrivers << user
        end
        render json: { auth: true, user: current_user, allDrivers: allDrivers }
      elsif current_user.role === 'driver'
        render json: { auth: true, user: current_user }
      end
    else
      render json: { auth: false, user: nil }
    end
  end

  def update
    data = JSON.parse(request.body.read)
    new_driver = data['selectedDriverId']
    pickup = Pickup.find(data['currentCleintId'])
    pickup.driver_id = new_driver
    pickup.save
    render json: pickup.driver
  end
end
