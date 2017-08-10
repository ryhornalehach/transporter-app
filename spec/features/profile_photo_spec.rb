require "rails_helper"

feature "profile photo" do
  scenario "visitor signs up and uploads a profile photo" do
    visit root_path
    first(:link, "Sign Up").click

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
    attach_file "upload", "#{Rails.root}/spec/support/images/linkedin.png"

    click_button "Sign up"
    first(:link, "Profile").click
    expect(page).to have_css("img[src*='linkedin.png']")
  end
end
