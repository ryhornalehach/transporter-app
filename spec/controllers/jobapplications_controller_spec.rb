require 'rails_helper'

RSpec.describe JobapplicationsController, type: :controller do

  let!(:jobapplication_1) {Jobapplication.create(
        first_name: "Jason", last_name: "Bourne", middle_name: 'M',
        address: '100 Main st.', city: 'Lowell', state: 'MA', zip: '01802',
        phone: '857-123-1234', email: "jbourne@hotmail.com", birth_date: '1 Jan 1985',
        dl_number: 'xxx12345', dl_issuedate: '1 Jan 2005', dl_state: 'MA',
        years_experience: true, ssn: '111-22-3344', emergency_contact_name: 'Harry H',
        emergency_contact_phone: '111-222-3333', own_car: true, full_time: true,
        hours_available: 'any time', driving_violations: 'no violations',
        criminal_records: 'No records', professional_experience: 'Some great driving experience',
        references: 'some people' )}
  let!(:admin) {User.create(
        first_name: "Admin", last_name: "Shiny", email: "admin@admin.com",
        password: "admin123", address: '99 Main st.', city: 'Reading',
        state: 'CT', zip: '01991', phone: '689-123-5435',
        admin: true, role: 'admin' )}
  let!(:user_1) {User.create(
        first_name: "David", last_name: "Hasselhoff", email: "theHoff@yahoo.com",
        password: "password", address: '100 Main st.', city: 'Lynn',
        state: 'MA', zip: '01990', phone: '617-111-2222' )}


    describe 'GET#index' do
#  Acceptance Criteria:
#  [] If I am signed in as an admin, I can get the list of all job applications
      it ('should return all jobapplications for admin') do
        sign_in admin
        get :index

        expect(response).to render_template("index")
      end
#  [x] If I am signed in as a user, I can get the list of assigned to me clients


#  [x] If I am not signed in as a user, I can't get the list of the clients

    end

    # describe 'GET#show' do
#  Acceptance Criteria:
#  [x] If I am logged in as an admin, I can get the specified client's info
      # it ('should return specified client and assigned driver information') do
      #   sign_in admin
      #   get :show, params: { id: client_1.id }
      #
      #   returned_json = JSON.parse(response.body)
      #   expect(response.status).to eq 200
      #   expect(response.content_type).to eq("application/json")
      #   expect(returned_json.length).to eq 2
      #
      #   expect(returned_json['driver']['first_name']).to eq user_1.first_name
      # end


#  [x] If I am not logged in the system, I can't get any user's information


#  [x] If I am logged in as a driver, I can get assigned to me client's information


#  [x] If I am logged in as a driver, I can't get not assigned to me client's information

    # end

end
