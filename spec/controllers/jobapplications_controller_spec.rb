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
      it ('should render the "index" template for admin') do
        sign_in admin
        get :index
        expect(response).to render_template("index")
      end

      it ('should create the instance variable with all job applications') do
        sign_in admin
        get :index
        expect(assigns(:jobapplications)).to eq([jobapplication_1])
      end

      it ('should raise error when driver tries to access the index page') do
        sign_in user_1
        expect{ get :index }.to raise_error(ActionController::RoutingError)
      end

      it ('should raise error not signed in visitor tries to access the index page') do
        expect{ get :index }.to raise_error(NoMethodError)
      end
    end

    describe 'GET#show' do
      it ('should render the "show" template for admin') do
        sign_in admin
        get :show, params: { id: jobapplication_1.id }
        expect(response).to render_template("show")
      end

      it ('should create the instance variable with current job application') do
        sign_in admin
        get :show, params: { id: jobapplication_1.id }
        expect(assigns(:jobapplication)).to eq(jobapplication_1)
      end

      it ('should raise error not signed in visitor tries to access the show page') do
        expect{ get :show, params: { id: jobapplication_1.id } }.to raise_error(NoMethodError)
      end

      it ('should raise error when driver tries to access the show page') do
        sign_in user_1
        expect{ get :show, params: { id: jobapplication_1.id } }.to raise_error(ActionController::RoutingError)
      end
    end
end
