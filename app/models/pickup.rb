class Pickup < ApplicationRecord
   validates :name, presence: true, length: { minimum: 2 }
   validates :pickup_time, presence: true
   validates :pickup_address, presence: true, length: { minimum: 2 }
   validates :pickup_city, presence: true, length: { minimum: 2 }
   validates :dropoff_address, presence: true, length: { minimum: 2 }
   validates :dropoff_city, presence: true, length: { minimum: 2 }

   belongs_to :driver, class_name: 'User', optional: true
end
