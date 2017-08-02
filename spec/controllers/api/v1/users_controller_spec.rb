require 'rails_helper'

RSpec.describe Api::V1::UsersController, type: :controller do

  let!(:user_1) {User.create(
        first_name: "David", last_name: "Hasselhoff", email: "theHoff@yahoo.com",
        password: "password", address: '100 Main st.', city: 'Lynn',
        state: 'MA', zip: '01990', phone: '617-111-2222' )}
  let!(:user_2) {User.create(
        first_name: "Anthony", last_name: "Blah", email: "blah@google.com",
        password: "password", address: '77 Seventh st', city: 'Plymouth',
        state: 'MA', zip: '02450', phone: '215-123-1432' )}
  let!(:admin) {User.create(
        first_name: "Admin", last_name: "Shiny", email: "admin@admin.com",
        password: "admin123", address: '99 Main st.', city: 'Reading',
        state: 'CT', zip: '01991', phone: '689-123-5435',
        admin: true, role: 'admin' )}
  let!(:client_1) {Pickup.create(
        name: "John", pickup_time: '0615A', pickup_address: '33 First ave.',
        pickup_city: 'Medford', dropoff_address: '100 Massachusetts ave.',
        dropoff_city: 'Cambridge', driver_id: user_1.id )}
  let!(:client_2) {Pickup.create(
        name: "Samantha", pickup_time: '0830A', pickup_address: '11 Shine ln.',
        pickup_city: 'Beverly', dropoff_address: '2100 Dorchester ave.',
        dropoff_city: 'Dorchester')}

    describe 'GET#index' do
#  Acceptance Criteria:
#  [x] If I am logged in as an admin, I can get the list of all users
      it ('should return all users for admin') do
        sign_in admin
        get :index

        returned_json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(response.content_type).to eq("application/json")
        expect(returned_json.length).to eq 3
        expect(returned_json['allDrivers'][0]['first_name']).to eq user_1.first_name
        expect(returned_json['allDrivers'][0]['last_name']).to eq user_1.last_name
        expect(returned_json['allDrivers'][0]['email']).to eq user_1.email
        expect(returned_json['allDrivers'][0]['address']).to eq user_1.address
        expect(returned_json['allDrivers'][0]['city']).to eq user_1.city
        expect(returned_json['allDrivers'][0]['state']).to eq user_1.state
        expect(returned_json['allDrivers'][0]['zip']).to eq user_1.zip
        expect(returned_json['allDrivers'][0]['phone']).to eq user_1.phone
      end

#  [x] If I am not logged in as an admin, I can't get the list of all users
      it ('should not return list of users if a user is not signed in as admin') do
        get :index

        returned_json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(response.content_type).to eq("application/json")
        expect(returned_json.length).to eq 2
        expect(returned_json['auth']).to eq false
        expect(returned_json['user']).to eq nil
      end
    end

    describe 'GET#show' do
#  Acceptance Criteria:
#  [x] If I am logged in as an admin, I can get the specified uses's info
      it ('should return specified user information') do
        sign_in admin
        get :show, params: { id: user_1.id }

        returned_json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(response.content_type).to eq("application/json")

        expect(returned_json['driver']['first_name']).to eq user_1.first_name
        expect(returned_json['driver']['last_name']).to eq user_1.last_name
        expect(returned_json['driver']['email']).to eq user_1.email
        expect(returned_json['driver']['address']).to eq user_1.address
        expect(returned_json['driver']['city']).to eq user_1.city
        expect(returned_json['driver']['state']).to eq user_1.state
        expect(returned_json['driver']['zip']).to eq user_1.zip
        expect(returned_json['driver']['phone']).to eq user_1.phone
      end

#  [x] If I am logged in as an admin, I can get the specified driver's clients information
      it ('should return specified drivers clients') do
        sign_in admin
        get :show, params: { id: user_1.id }

        returned_json = JSON.parse(response.body)
        expect(returned_json['clients'][0]['name']).to eq client_1.name
        expect(returned_json['clients'][0]['pickup_time']).to eq client_1.pickup_time
        expect(returned_json['clients'][0]['pickup_address']).to eq client_1.pickup_address
        expect(returned_json['clients'][0]['pickup_city']).to eq client_1.pickup_city
        expect(returned_json['clients'][0]['dropoff_address']).to eq client_1.dropoff_address
        expect(returned_json['clients'][0]['dropoff_city']).to eq client_1.dropoff_city
        expect(returned_json['clients'][0]['driver_id']).to eq client_1.driver_id
      end

#  [x] If I am not logged in the system, I can't get any user's information
      it ('should return error') do
        get :show, params: { id: user_1.id }

        returned_json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(response.content_type).to eq("application/json")
        expect(returned_json.length).to eq 5

        expect(returned_json['auth']).to eq false
        expect(returned_json['user']).to eq nil
        expect(returned_json['driver']).to eq nil
        expect(returned_json['clients']).to eq nil
        expect(returned_json['error']).to eq 'You are not authorized'
      end

#  [x] If I am logged in as a driver, I can't get any information
      it ('should return error') do
        sign_in user_1
        get :show, params: { id: user_1.id }

        returned_json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(response.content_type).to eq("application/json")
        expect(returned_json.length).to eq 5

        expect(returned_json['auth']).to eq false
        expect(returned_json['user']).to eq nil
        expect(returned_json['driver']).to eq nil
        expect(returned_json['clients']).to eq nil
        expect(returned_json['error']).to eq 'You are not authorized'
      end

#  [x] If I am logged in as a driver, I can't get other user's information
      it ('should return error') do
        sign_in user_1
        get :show, params: { id: admin.id }

        returned_json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(response.content_type).to eq("application/json")
        expect(returned_json.length).to eq 5

        expect(returned_json['auth']).to eq false
        expect(returned_json['user']).to eq nil
        expect(returned_json['driver']).to eq nil
        expect(returned_json['clients']).to eq nil
        expect(returned_json['error']).to eq 'You are not authorized'
      end
    end

    describe "PUT#update" do
#  Acceptance Criteria:
#  [x] If I am logged in as an admin, the controller sends me back the information of the driver
      it "should should return driver information" do
        data = { "selectedDriverId"=>user_2.id, "currentCleintId"=>client_2.id }.to_json
        sign_in admin

        put(:update , params: { id: user_2.id } , body: data)

        returned_json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(returned_json).to be_kind_of(Hash)
        expect(returned_json).to_not be_kind_of(Array)
        expect(returned_json['first_name']).to eq user_2.first_name
        expect(returned_json['last_name']).to eq user_2.last_name
      end

#  [x] If I am logged in as an admin, I can assign a driver for clients
      xit "should update client's info and assign a driver to the client" do
        data = { "selectedDriverId"=>user_2.id, "currentCleintId"=>client_2.id }.to_json
        sign_in admin
        put(:update , params: { id: user_2.id } , body: data)

        expect(client_2.driver_id).to eq user_2.id
      end
    end
end
