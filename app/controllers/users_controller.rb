class UsersController < ApplicationController
  before_action :authorize_user, except: [:show]

  def show
    if current_user && current_user.admin?
      @user = User.find(params[:id])
    else
      @user = User.find(current_user[:id])
    end
  end

  def index
    @users = User.paginate(page: params[:page], per_page: 25)
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    if @user.update_attributes(edit_user_params)
      redirect_to user_path(@user), notice: "User Info Updated"
    else
      redirect_to user_path(@user), notice: "Failed to Update!"
    end
  end

  def destroy
    @user = User.find(params[:id]).destroy
    UsersMailer.deleted_user(@user).deliver
    redirect_to users_path, notice: "User Deleted"
  end

  private

  def authorize_user
    if !current_user.admin?
      raise ActionController::RoutingError.new("Not Found")
    end
  end

  def edit_user_params
    params.require(:user).permit(:first_name, :last_name, :address, :city, :state, :zip, :phone, :email)
  end
end
