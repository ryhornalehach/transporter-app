class DaysController < ApplicationController
  before_action :authorize_user

  def show
    @day = Day.find(params[:id])
  end

  def index
    @days = Day.paginate(page: params[:page], per_page: 25)
  end

  private

  def authorize_user
    if !current_user.admin?
      raise ActionController::RoutingError.new("Not Found")
    end
  end
end
