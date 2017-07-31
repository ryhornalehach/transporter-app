class Api::V1::PickupsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    render json: Pickup.all
  end

  def show
    pickup = Pickup.find(params[:id])
    render json: pickup
  end
end
