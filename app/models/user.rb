class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

   roles = ['driver', 'admin', 'manager']

   validates :first_name, presence: true, length: { minimum: 2 }
   validates :last_name, presence: true, length: { minimum: 2 }
   validates :address, presence: true, length: { minimum: 2 }
   validates :city, presence: true, length: { minimum: 2 }
   validates :state, presence: true, length: { minimum: 2 }
   validates :zip, presence: true, numericality: { only_integer: true }, length: { is: 5 }
   validates :phone, presence: true, length: { minimum: 10 }
   validates :email, presence: true, length: { minimum: 2 }
   validates :role, presence: true, length: { minimum: 2 }, inclusion: { in: roles, :message => "must valid role" }

   has_many :pickups, class_name: 'Pickup', foreign_key: 'driver_id'

   def admin?
     admin == true
   end
end
