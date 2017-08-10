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

  def show
    if current_user
      if current_user.role === 'admin' || current_user.role === 'manager'
        driver = User.find(params[:id])
        clients = Pickup.where(driver_id: driver.id).order(pickup_time: :asc)
        render json: { auth: true, current_user: current_user, driver: driver, clients: clients, error: nil }
      else
        render json: { auth: false, user: nil, driver: nil, clients: nil, error: 'You are not authorized' }
      end
    else
      render json: { auth: false, user: nil, driver: nil, clients: nil, error: 'You are not authorized' }
    end
  end

  def update
    if current_user
      if current_user.role === 'admin' || current_user.role === 'manager'
        data = JSON.parse(request.body.read)
        if data['selectedDriverId'] == 0
          new_driver = nil
        elsif data['selectedDriverId']
          new_driver = data['selectedDriverId']
        else
          new_driver = nil
        end
        pickup = Pickup.find(data['currentClientId'])
        pickup.driver_id = new_driver
        pickup.save
        render json: pickup.driver
      else
        render json: { auth: false, user: nil, driver: nil, clients: nil, error: 'You are not authorized' }
      end
    else
      render json: { auth: false, user: nil, driver: nil, clients: nil, error: 'You are not authorized' }
    end
  end
end
