require 'rails_helper'

RSpec.describe Pickup, :type => :model do
  subject {
    described_class.new(
        name: 'John Smith', pickup_time: '0615A',
        pickup_address: '100 Main st.', pickup_city: 'Lowell',
        dropoff_address: '850 Harrison ave.', dropoff_city: 'Boston'
      )
  }

  it "is valid with valid attributes" do
    expect(subject).to be_valid
  end
  it "is not valid without a name" do
    subject.name = nil
    expect(subject).to_not be_valid
  end
  it "is not valid without a pickup time" do
    subject.pickup_time = nil
    expect(subject).to_not be_valid
  end
  it "is not valid without a pickup address" do
    subject.pickup_address = nil
    expect(subject).to_not be_valid
  end
  it "is not valid without a pickup city" do
      subject.pickup_city = nil
      expect(subject).to_not be_valid
  end
  it "is not valid without a drop off address" do
    subject.dropoff_address = nil
    expect(subject).to_not be_valid
  end
  it "is not valid without a drop off city" do
    subject.dropoff_city = nil
    expect(subject).to_not be_valid
  end
end
