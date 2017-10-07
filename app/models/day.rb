class Day < ApplicationRecord
  validates :status, presence: true
  has_many :records
end
