class ImportsController < ApplicationController
  before_action :authorize_user

  def new
    @new_file = Import.new
  end

  def create
    @new_file = Import.new(import_params)
    xlsx = Roo::Spreadsheet.open(@new_file.import)  # reading xlsx file
    i = 4 # reading rows starting from row #4 (where the header ends and the information begins)
    while i <= xlsx.last_row do       # iterating through the rows of the Excel file
      app_time = xlsx.row(i)[3]
      comm = xlsx.row(i)[5]
      phone = xlsx.row(i)[7]
      if xlsx.row(i)[3].nil?
        app_time = '' # in case if appointment time is blank
      end
      if xlsx.row(i)[5].nil?
        comm = '' # in case if comment field is blank
      end
      if xlsx.row(i)[7].nil?
        phone = '' # in case if phone field is blank
      end
      client = Pickup.create( name: xlsx.row(i)[6], comment: comm,
              pickup_time: xlsx.row(i)[2], appointment_time: app_time,
              pickup_address: xlsx.row(i)[8], pickup_city: xlsx.row(i)[9],
              dropoff_address: xlsx.row(i)[10], dropoff_city: xlsx.row(i)[11],
              phone: phone )  # creating the Pickup with the information from the current row
      Record.create(day_id: Day.last.id, pickup1_id: client.id ) # creating the Record corresponding to new Pickup
      i += 1
    end
    redirect_to root_path, notice: "Clients successfully imported"
  end

  private

  def authorize_user  # making sure that only admins can access this controller
    if !current_user.admin?
      raise ActionController::RoutingError.new("Not Found")
    end
  end
  def import_params # allowed params for the current model
    params.require(:import).permit(:import)
  end

end
