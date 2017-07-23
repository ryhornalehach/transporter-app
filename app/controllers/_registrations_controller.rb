class RegistrationsController < Devise::RegistrationsController
  before_filter :new_user_params

  private

  def new_user_params
    params.require(:user).permit(:first_name, :last_name, :address, :city, :state, :zip, :phone, :email)
  end
end
