require 'rails_helper'

RSpec.describe User, :type => :model do
  subject {
    described_class.new(
        first_name: "Jason", last_name: "Bourne",
        address: '100 Main st.', city: 'Lowell', state: 'MA', zip: '01802',
        phone: '857-123-1234', email: "jbourne@hotmail.com", password: "test123"
      )
  }

  it "is valid with valid attributes" do
    expect(subject).to be_valid
  end

  it "is not valid without a first_name" do
    subject.first_name = nil
    expect(subject).to_not be_valid
  end
  it "is not valid without a last_name" do
    subject.last_name = nil
    expect(subject).to_not be_valid
  end
  it "is not valid without a address" do
    subject.address = nil
    expect(subject).to_not be_valid
  end
  it "is not valid without a city" do
    subject.city = nil
    expect(subject).to_not be_valid
  end
  it "is not valid without a state" do
    subject.state = nil
    expect(subject).to_not be_valid
  end
  it "is not valid without a zip" do
    subject.zip = nil
    expect(subject).to_not be_valid
  end
  it "is not valid without a phone" do
    subject.phone = nil
    expect(subject).to_not be_valid
  end
  it "is not valid without a email" do
    subject.email = nil
    expect(subject).to_not be_valid
  end
end
