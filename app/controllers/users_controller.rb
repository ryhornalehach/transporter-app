class UsersController < ApplicationController
  def show
    if current_user && current_user.admin?
      @user = User.find(params[:id])
    else
      @user = User.find(current_user[:id])
    end
  end
end
