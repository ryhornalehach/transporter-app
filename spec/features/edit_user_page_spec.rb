require "rails_helper"

feature "user edits info",
%Q{As a user
 I want to be able to edit my account's information
 So that i can change my info} do

# Acceptance Criteria:
#  [x] If I am logged in, I can visin edit account page
#  [x] If I specify valid current password, I can make changes to my info
#  [x] If I don't specify valid current password, I can't make any changes to my info

  scenario "Visitor logs in and visit the edit page" do
    user_1 = User.create(first_name: "David", last_name: "Hasselhoff", email: "theHoff@yahoo.com", password: "password", address: '100 Main st.', city: 'Lynn', state: 'MA', zip: '01990', phone: '617-111-2222')

    visit root_path
    first(:link, "Sign In").click
    fill_in 'Email', with: user_1.email
    fill_in 'Password', with: user_1.password
    click_button "Log in"

    first(:link, "Profile").click
    first(:link, "Edit My Profile").click

    expect(page).to have_content "Edit my profile"
    expect(find_field('First name').value).to eq user_1.first_name
    expect(find_field('Last name').value).to eq user_1.last_name
    expect(find_field('Email').value).to eq user_1.email
    expect(find_field('Address').value).to eq user_1.address
    expect(find_field('City').value).to eq user_1.city
    expect(find_field('Phone').value).to eq user_1.phone
    expect(find_field('Zip').value).to eq user_1.zip
    expect(find_field('State').value).to eq user_1.state
  end

  scenario "Visitor edits the information" do
    user_1 = User.create(first_name: "David", last_name: "Hasselhoff", email: "theHoff@yahoo.com", password: "password", address: '100 Main st.', city: 'Lynn', state: 'MA', zip: '01990', phone: '617-111-2222')

    visit root_path
    first(:link, "Sign In").click
    fill_in 'Email', with: user_1.email
    fill_in 'Password', with: user_1.password
    click_button "Log in"

    first(:link, "Profile").click
    first(:link, "Edit My Profile").click

    fill_in "First name", with: "Howard"
    fill_in "Last name", with: "Stark"
    fill_in "Email", with: "ash@s-mart.com"
    fill_in 'Address', with: "99 First ave."
    fill_in 'City', with: "Norton"
    fill_in 'State', with: "CA"
    fill_in 'Zip', with: "91890"
    fill_in 'Phone', with: "818-818-8888"
    fill_in "Password", with: "boomstick!3vilisd3ad"
    fill_in "Password confirmation", with: "boomstick!3vilisd3ad"
    fill_in "Current password", with: "password"

    click_button "Update"
    first(:link, "Profile").click
    first(:link, "Edit My Profile").click

    expect(find_field('First name').value).to eq "Howard"
    expect(find_field('Last name').value).to eq "Stark"
    expect(find_field('Email').value).to eq "ash@s-mart.com"
    expect(find_field('Address').value).to eq "99 First ave."
    expect(find_field('City').value).to eq "Norton"
    expect(find_field('State').value).to eq "CA"
    expect(find_field('Zip').value).to eq "91890"
    expect(find_field('Phone').value).to eq "818-818-8888"
  end

  scenario "Visitor can't edit the information without a current password" do
    user_1 = User.create(first_name: "David", last_name: "Hasselhoff", email: "theHoff@yahoo.com", password: "password", address: '100 Main st.', city: 'Lynn', state: 'MA', zip: '01990', phone: '617-111-2222')

    visit root_path
    first(:link, "Sign In").click
    fill_in 'Email', with: user_1.email
    fill_in 'Password', with: user_1.password
    click_button "Log in"

    first(:link, "Profile").click
    first(:link, "Edit My Profile").click

    fill_in "First name", with: "Howard"
    fill_in "Last name", with: "Stark"
    fill_in "Email", with: "ash@s-mart.com"

    click_button "Update"

    expect(page).to have_content "Current password can't be blank"
  end
end
