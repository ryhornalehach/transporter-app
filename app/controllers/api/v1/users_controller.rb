class Api::V1::UsersController < ApplicationController
  def index
    if current_user
      render json: { auth: true, user: current_user }
    else
      render json: { auth: false, user: nil }
    end
  end
end
