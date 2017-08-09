class JobapplicationsController < ApplicationController
  before_action :authorize_user, except: [:new, :create]

  def show
    if current_user && current_user.admin?
      @jobapplication = Jobapplication.find(params[:id])
    else
      @jobapplication = Jobapplication.find(current_user[:id])
    end
  end

  def index
    @jobapplications = Jobapplication.paginate(page: params[:page], per_page: 25)
  end

  def edit
    @jobapplication = Jobapplication.find(params[:id])
  end

  def update
    @jobapplication = Jobapplication.find(params[:id])
    if @jobapplication.update_attributes(jobapplication_params)
      redirect_to jobapplication_path(@jobapplication), notice: "Job application updated"
    else
      redirect_to jobapplication_path(@jobapplication), notice: "Failed to Update!"
    end
  end

  def new
    @jobapplication = Jobapplication.new
  end

  def create
    @new_jobapplication = Jobapplication.new(jobapplication_params)
    if @new_jobapplication.save
      UsersMailer.new_job_application(@new_jobapplication).deliver
      redirect_to root_path, notice: "Job application was successfully submitted. Hiring manager will contact you as soon as the application will be processed."
    else
      redirect_to root_path, notice: "Application not submitted due to an error in the submitted form. Try again please."
    end
  end

  def destroy
    @jobapplication = Jobapplication.find(params[:id]).destroy
    redirect_to jobapplications_path, notice: "Job application deleted"
  end

  private

  def authorize_user
    if !current_user.admin?
      raise ActionController::RoutingError.new("Not Found")
    end
  end

  def jobapplication_params
    params.require(:jobapplication).permit(:first_name, :last_name, :middle_name,
      :address, :city, :state, :zip, :phone, :email, :birth_date, :dl_number,
      :dl_issuedate, :dl_state, :years_experience, :ssn, :emergency_contact_name,
      :emergency_contact_phone, :own_car, :car_year, :car_make, :car_model,
      :livery_plates, :full_time, :hours_available, :driving_violations,
      :criminal_records, :professional_experience, :references)
  end
end
