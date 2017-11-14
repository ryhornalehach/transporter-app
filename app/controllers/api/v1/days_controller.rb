require_relative "../../../../quickstart.rb"

class Api::V1::DaysController < ApplicationController
  skip_before_action :verify_authenticity_token

  def authorize
    FileUtils.mkdir_p(File.dirname(CREDENTIALS_PATH))

    client_id = Google::Auth::ClientId.from_file(CLIENT_SECRETS_PATH)
    token_store = Google::Auth::Stores::FileTokenStore.new(file: CREDENTIALS_PATH)
    authorizer = Google::Auth::UserAuthorizer.new(
      client_id, SCOPE, token_store)
    user_id = 'default'
    credentials = authorizer.get_credentials(user_id)
    if credentials.nil?
      url = authorizer.get_authorization_url(
        base_url: OOB_URI)
      puts "Open the following URL in the browser and enter the " +
           "resulting code after authorization"
      puts url
      code = gets
      credentials = authorizer.get_and_store_credentials_from_code(
        user_id: user_id, code: code, base_url: OOB_URI)
    end
    credentials
  end

  def index

    # Initialize the API
    service = Google::Apis::SheetsV4::SheetsService.new
    service.client_options.application_name = APPLICATION_NAME
    service.authorization = authorize

    # Prints the names and majors of students in a sample spreadsheet:
    # https://docs.google.com/spreadsheets/d/1FCSYucWISilyzlLif7hwFsARVtn91k2hkxLNaaX18KY/edit
    spreadsheet_id = '1FCSYucWISilyzlLif7hwFsARVtn91k2hkxLNaaX18KY'
    range = 'Schedule!A4:L'
    puts 'HI there'
    response = service.get_spreadsheet_values(spreadsheet_id, range)
    puts 'Name, Phone:'
    puts 'No data found.' if response.values.empty?
      # Displaying only Timothy`s clients
    response.values.each do |row|
      if row[1] == "Timothy"
        puts "#{row[6]}, #{row[7]}"
      end
      # Print columns G and H, which correspond to indices 6 and 7.
      # puts "#{row[6]}, #{row[7]}"
    end

    binding.pry
    if current_user
      if current_user.role === 'admin' || current_user.role === 'manager'
        allDays = Day.all.reverse
        openDays =[]
        openDays << Day.where(status: 'current')
        if Day.where(status: 'future') != []
          openDays << Day.where(status: 'future')
        end
        render json: { allDays: allDays, openDays: openDays, error: nil }
      elsif current_user.role === 'driver'
        render json: { allDays: nil, error: 'You are not authorized' }
      end
    else
      render json: { allDays: nil, error: 'You are not authorized' }
    end
  end

  def show
    if current_user
      if current_user.role === 'admin' || current_user.role === 'manager'
        day = Day.find(params[:id])
        records = Record.where(day_id: day.id).order({driver_id: :asc}, {order: :asc})
        render json: { day: day, records: records, drivers: User.where(role: 'driver'), pickups: Pickup.all, error: nil }
      else
        render json: { day: nil, records: nil, error: 'You are not authorized' }
      end
    else
      render json: { day: nil, records: nil, error: 'You are not authorized' }
    end
  end

  def update
    if current_user
      if current_user.role === 'admin' || current_user.role === 'manager'
        data = JSON.parse(request.body.read)
        if data['method'] === 'group'
          record = Record.find(data['recordId'].to_i)
          record.pickup2_id = data['pickup2'].to_i
          record.pickup3_id = data['pickup3'].to_i
          record.save
          Record.where(pickup1_id: record.pickup2_id).destroy_all
          render json: { saved_record: record, error: nil }
        elsif data['method'] === 'split'
          record = Record.find(data['recordId'].to_i)
          Record.create(order: record.order, pickup1_id: record.pickup2_id, driver_id: record.driver_id, day_id: record.day_id)
          if !record.pickup3_id.nil? && record.pickup3_id > 0
            Record.create(order: record.order, pickup1_id: record.pickup3_id, driver_id: record.driver_id, day_id: record.day_id)
          end
          record.pickup2_id = nil
          record.pickup3_id = nil
          record.save
        elsif data['method'] === 'status'
          day = Day.find(data['dayId'])
          day.status = data['status']
          day.save!
        end
      else
        render json: { error: 'You are not authorized' }
      end
    else
      render json: { error: 'You are not authorized' }
    end
  end

end
