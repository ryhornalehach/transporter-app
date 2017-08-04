require 'rails_helper'

RSpec.describe Api::V1::PickupsController, type: :controller do

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
#  [x] If I am signed in as an admin, I can get the list of all clients
      it ('should return all pickups for admin') do
        sign_in admin
        get :index

        returned_json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(response.content_type).to eq("application/json")
        expect(returned_json.length).to eq 2
        expect(returned_json[0]['name']).to eq client_1.name
        expect(returned_json[0]['pickup_address']).to eq client_1.pickup_address
        expect(returned_json[1]['name']).to eq client_2.name
        expect(returned_json[1]['pickup_address']).to eq client_2.pickup_address
      end
#  [x] If I am signed in as a user, I can get the list of assigned to me clients
      it ('should only return assigned to the driver clients') do
        sign_in user_1
        get :index

        returned_json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(response.content_type).to eq("application/json")
        expect(returned_json.length).to eq 1
        expect(returned_json[0]['name']).to eq client_1.name
        expect(returned_json[0]['pickup_address']).to eq client_1.pickup_address
      end

#  [x] If I am not signed in as a user, I can't get the list of the clients
      it ('should return error if the user is not signed in') do
        get :index

        returned_json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(response.content_type).to eq("application/json")
        expect(returned_json.length).to eq 1
        expect(returned_json['error']).to eq 'You are not authorized'
      end
    end

    describe 'GET#show' do
#  Acceptance Criteria:
#  [x] If I am logged in as an admin, I can get the specified client's info
      it ('should return specified client and assigned driver information') do
        sign_in admin
        get :show, params: { id: client_1.id }

        returned_json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(response.content_type).to eq("application/json")
        expect(returned_json.length).to eq 2

        expect(returned_json['driver']['first_name']).to eq user_1.first_name
        expect(returned_json['driver']['last_name']).to eq user_1.last_name
        expect(returned_json['pickup']['name']).to eq client_1.name
      end


#  [x] If I am not logged in the system, I can't get any user's information
      it ('should return error') do
        get :show, params: { id: client_1.id }

        returned_json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(response.content_type).to eq("application/json")
        expect(returned_json.length).to eq 1
        expect(returned_json['error']).to eq 'You are not authorized'
      end

#  [x] If I am logged in as a driver, I can get assigned to me client's information
      it ('should return error') do
        sign_in user_1
        get :show, params: { id: client_1.id }

        returned_json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(response.content_type).to eq("application/json")
        expect(returned_json.length).to eq 2

        expect(returned_json['driver']['first_name']).to eq user_1.first_name
        expect(returned_json['driver']['last_name']).to eq user_1.last_name
        expect(returned_json['pickup']['name']).to eq client_1.name
      end

#  [x] If I am logged in as a driver, I can't get not assigned to me client's information
      it ('should return error') do
        sign_in user_1
        get :show, params: { id: client_2.id }

        returned_json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(response.content_type).to eq("application/json")
        expect(returned_json.length).to eq 1

        expect(returned_json['error']).to eq 'You are not authorized'
      end

    end

    describe "PUT#update" do
#  Acceptance Criteria:
#  [x] If I am logged in as an admin, the controller sends me back the information of the client
      it "should  return client information" do
        data = { state: true, stateType: 'picked_up' }.to_json
        sign_in admin
        put(:update , params: { id: client_1.id } , body: data)

        returned_json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(returned_json).to be_kind_of(Hash)
        expect(returned_json).to_not be_kind_of(Array)
        expect(returned_json['name']).to eq client_1.name
        expect(returned_json['pickup_address']).to eq client_1.pickup_address
      end

#  [x] If I am logged in as an admin, I can update the picked_up state of the client
      it "should update client picked_up state" do
        data = { state: true, stateType: 'picked_up' }.to_json
        sign_in admin
        put(:update , params: { id: client_1.id } , body: data)

        returned_json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(returned_json['picked_up']).to eq true
      end

#  [x] If I am logged in as a driver, I can update the picked_up state of my client
      it "should update client picked_up state" do
        data = { state: true, stateType: 'picked_up' }.to_json
        sign_in user_1
        put(:update , params: { id: client_1.id } , body: data)

        returned_json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(returned_json['picked_up']).to eq true
      end

#  [x] If I am logged in as a driver, I can't update the picked_up state of client that is not assigned to me
      it "should not update client information" do
        data = { state: true, stateType: 'picked_up' }.to_json
        sign_in user_2
        put(:update , params: { id: client_1.id } , body: data)

        returned_json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(returned_json['error']).to eq 'You are not authorized'
      end

#  [x] If I am not logged in, I can't update the picked_up state of client that is not assigned to me
      xit "should not update client information" do
        data = { state: true, stateType: 'picked_up' }.to_json
        put(:update , params: { id: client_1.id } , body: data)

        returned_json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(returned_json['error']).to eq 'You are not authorized'
      end

#  [x] If I am logged in as a driver, I can't update the dropped_off state of client that is not assigned to me
      it "should not update client information" do
        data = { state: true, stateType: 'dropped_off' }.to_json
        sign_in user_2
        put(:update , params: { id: client_1.id } , body: data)

        returned_json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(returned_json['error']).to eq 'You are not authorized'
      end

#  [x] If I am logged in as a driver, I can update the dropped_off state of my client
      it "should update client dropped_off state" do
        data = { state: true, stateType: 'dropped_off' }.to_json
        sign_in user_1
        put(:update , params: { id: client_1.id } , body: data)

        returned_json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(returned_json['dropped_off']).to eq true
      end

    end
end
