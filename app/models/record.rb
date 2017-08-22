class Record < ApplicationRecord
   validates :order, numericality: true, allow_nil: true

   belongs_to :driver, class_name: 'User', optional: true
   belongs_to :day
   has_many :pickups
end
