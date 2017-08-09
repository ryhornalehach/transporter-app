require 'rails_helper'

RSpec.describe Jobapplication, :type => :model do
  subject {
    described_class.new(
      first_name: "Jason", last_name: "Bourne", middle_name: 'M',
      address: '100 Main st.', city: 'Lowell', state: 'MA', zip: '01802',
      phone: '857-123-1234', email: "jbourne@hotmail.com", birth_date: '1 Jan 1985',
      dl_number: 'xxx12345', dl_issuedate: '1 Jan 2005', dl_state: 'MA',
      years_experience: true, ssn: '111-22-3344', emergency_contact_name: 'Harry H',
      emergency_contact_phone: '111-222-3333', own_car: true, full_time: true,
      hours_available: 'any time', driving_violations: 'no violations',
      criminal_records: 'No records', professional_experience: 'Some great driving experience',
      references: 'some people'
      )
  }

  it "is valid with valid attributes" do
    expect(subject).to be_valid
  end
  it "is not valid without a first name" do
    subject.first_name = nil
    expect(subject).to_not be_valid
  end
  it "is not valid without a last name" do
    subject.last_name = nil
    expect(subject).to_not be_valid
  end
  it "is not valid without an address" do
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
  it "is not valid without an email" do
    subject.email = nil
    expect(subject).to_not be_valid
  end
  it "is not valid without a birth date" do
    subject.birth_date = nil
    expect(subject).to_not be_valid
  end
  it "is not valid without a DL number" do
    subject.dl_number = nil
    expect(subject).to_not be_valid
  end
  it "is not valid without a DL issue date" do
    subject.dl_issuedate = nil
    expect(subject).to_not be_valid
  end
  it "is not valid without a DL state" do
    subject.dl_state = nil
    expect(subject).to_not be_valid
  end
  it "is not valid without a years_experience field" do
    subject.years_experience = nil
    expect(subject).to_not be_valid
  end
  it "is not valid without a ssn" do
    subject.ssn = nil
    expect(subject).to_not be_valid
  end
  it "is not valid without a own car value" do
    subject.own_car = nil
    expect(subject).to_not be_valid
  end
  it "is not valid without a full time value" do
    subject.full_time = nil
    expect(subject).to_not be_valid
  end
  it "is not valid without an available hours" do
    subject.hours_available = nil
    expect(subject).to_not be_valid
  end
  it "is not valid without a driving_violations" do
    subject.driving_violations = nil
    expect(subject).to_not be_valid
  end
  it "is not valid without a criminal records" do
    subject.criminal_records = nil
    expect(subject).to_not be_valid
  end
  it "is not valid without a professional experience" do
    subject.professional_experience = nil
    expect(subject).to_not be_valid
  end
  it "is not valid without a references" do
    subject.references = nil
    expect(subject).to_not be_valid
  end
end
