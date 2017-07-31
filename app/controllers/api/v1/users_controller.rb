class Api::V1::UsersController < ApplicationController
  def index
    if current_user
      render json: { auth: true, id: current_user.id }
    else
      render json: { auth: false, id: nil }
    end
  end
end
