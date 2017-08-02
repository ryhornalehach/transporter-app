require "rails_helper"

feature "user signs up",
%Q{As a user
 I want to sign up
 So that i can have my account} do

# Acceptance Criteria:
 # [x] Specify a valid email
 # [x] Specify a password and confirm that password
 # [x] If i don't perform the above i get an error message
 # [x] If I specify valid information, i register my account and am validated

  scenario "specifying valid and required information" do
    visit root_path
    first(:link, "Sign Up").click
    expect(page).to have_content "Sign up"

    fill_in 'First name', with: "David"
    fill_in 'Last name', with: "Hasselhoff"
    fill_in 'Email', with: "theHoff@yahoo.com"
    fill_in 'Password', with: "password"
    fill_in 'Password confirmation', with: "password"
    fill_in 'Address', with: "100 Main st."
    fill_in 'City', with: "Lynn"
    fill_in 'State', with: "MA"
    fill_in 'Zip', with: "01990"
    fill_in 'Phone', with: "617-111-2222"

    click_button "Sign up"

    expect(page).to have_content "Sign out"
    expect(page).not_to have_content "Sign Up"
    expect(page).not_to have_content "Sign In"
  end

  scenario "specifying invalid required information" do
    visit root_path
    first(:link, "Sign Up").click

    fill_in 'First name', with: "David"
    fill_in 'Last name', with: "a"
    fill_in 'Email', with: "theHoff@yahoo.com"
    fill_in 'Password', with: "123456"
    fill_in 'Password confirmation', with: "asdfgh"
    fill_in 'Address', with: "100 Main st."
    fill_in 'City', with: "Lynn"
    fill_in 'State', with: "MA"
    fill_in 'Zip', with: "a123a"
    fill_in 'Phone', with: "617-111"

    click_button "Sign up"

    expect(page).to have_content "Last name is too short"
    expect(page).to have_content "Phone is too short"
    expect(page).to have_content "Password confirmation doesn't match Password"
    expect(page).to have_content "Zip is not a number"
    expect(page).not_to have_content "Sign out"
    expect(page).to have_content "Sign Up"
    expect(page).to have_content "Sign In"
  end

  scenario "specifying missing required information" do
    visit root_path
    first(:link, "Sign Up").click

    fill_in 'First name', with: "David"
    fill_in 'Last name', with: "Hasselhoff"
    fill_in 'Password', with: "password"
    fill_in 'Password confirmation', with: "password"
    fill_in 'Address', with: "100 Main st."
    fill_in 'City', with: "Lynn"
    fill_in 'Zip', with: "01990"

    click_button "Sign up"

    expect(page).to have_content "Phone can't be blank"
    expect(page).to have_content "Email can't be blank"
    expect(page).to have_content "State can't be blank"
    expect(page).not_to have_content "Sign out"
    expect(page).to have_content "Sign Up"
    expect(page).to have_content "Sign In"
  end
end
