require "rails_helper"

feature "admin can edit the users info",
%Q{As an admin
 I want to be able to edit users's information
 So that i can change some users info} do

# Acceptance Criteria:
#  [x] If I am logged in as an admin, I can visit the list of all users page
#  [x] If I am not logged in as an admin, I can't visit the list of all users page
#  [x] If I am logged in as an admin, I can edit the user's information

  scenario "Admin logs in and visit the users index page" do
    user_1 = User.create(first_name: "David", last_name: "Hasselhoff", email: "theHoff@yahoo.com", password: "password", address: '100 Main st.', city: 'Lynn', state: 'MA', zip: '01990', phone: '617-111-2222')
    admin = User.create(first_name: "Admin", last_name: "Shiny", email: "admin@admin.com", password: "admin123", address: '99 Main st.', city: 'Reading', state: 'CT', zip: '01991', phone: '689-123-5435', admin: true, role: 'admin')

    visit root_path
    first(:link, "Sign In").click
    fill_in 'Email', with: admin.email
    fill_in 'Password', with: admin.password
    click_button "Log in"

    first(:link, "All Users List").click

    expect(page).to have_content user_1.first_name
    expect(page).to have_content user_1.last_name
  end

  scenario "Visitor logs in not as admin and visit the users index page" do
    user_1 = User.create(first_name: "David", last_name: "Hasselhoff", email: "theHoff@yahoo.com", password: "password", address: '100 Main st.', city: 'Lynn', state: 'MA', zip: '01990', phone: '617-111-2222')

    visit root_path
    first(:link, "Sign In").click
    fill_in 'Email', with: user_1.email
    fill_in 'Password', with: user_1.password
    click_button "Log in"

    expect(page).not_to have_content "All Users List"
    expect{ get users_path }.to raise_error(NoMethodError)
  end

  scenario "Admin logs in and edit the user info" do
    user_1 = User.create(first_name: "David", last_name: "Hasselhoff", email: "theHoff@yahoo.com", password: "password", address: '100 Main st.', city: 'Lynn', state: 'MA', zip: '01990', phone: '617-111-2222')
    admin = User.create(first_name: "Admin", last_name: "Shiny", email: "admin@admin.com", password: "admin123", address: '99 Main st.', city: 'Reading', state: 'CT', zip: '01991', phone: '689-123-5435', admin: true, role: 'admin')

    visit root_path
    first(:link, "Sign In").click
    fill_in 'Email', with: admin.email
    fill_in 'Password', with: admin.password
    click_button "Log in"

    first(:link, "All Users List").click
    first(:link, "Edit User").click

    fill_in 'First name', with: "Samuel"
    fill_in 'Last name', with: "Brown"
    fill_in 'Address', with: "99 First ave."
    fill_in 'City', with: "Norton"
    fill_in 'State', with: "CA"
    fill_in 'Zip', with: "91890"
    fill_in 'Phone', with: "818-818-8888"
    click_button "Update User"

    expect(page).to have_content "Samuel"
    expect(page).to have_content "Brown"
    expect(page).to have_content "99 First ave."
    expect(page).to have_content "Norton"
    expect(page).to have_content "CA"
    expect(page).to have_content "91890"
    expect(page).to have_content "818-818-8888"
  end

  xscenario "Admin logs in and delete the user" do
    user_1 = User.create(first_name: "David", last_name: "Hasselhoff", email: "theHoff@yahoo.com", password: "password", address: '100 Main st.', city: 'Lynn', state: 'MA', zip: '01990', phone: '617-111-2222')
    admin = User.create(first_name: "Admin", last_name: "Shiny", email: "admin@admin.com", password: "admin123", address: '99 Main st.', city: 'Reading', state: 'CT', zip: '01991', phone: '689-123-5435', admin: true, role: 'admin')

    visit root_path
    first(:link, "Sign In").click
    fill_in 'Email', with: admin.email
    fill_in 'Password', with: admin.password
    click_button "Log in"

    first(:link, "All Users List").click
    first(:link, "Delete User").click

    expect(page).to have_content "User Deleted"
    expect(ActionMailer::Base.deliveries.count).to eq(1)
  end
end
