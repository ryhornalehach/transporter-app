class Jobapplication < ApplicationRecord
   validates :first_name, presence: true, length: { minimum: 2 }
   validates :last_name, presence: true, length: { minimum: 2 }
   validates :address, presence: true, length: { minimum: 2 }
   validates :city, presence: true, length: { minimum: 2 }
   validates :state, presence: true, length: { minimum: 2 }
   validates :zip, presence: true, numericality: { only_integer: true }, length: { is: 5 }
   validates :phone, presence: true, length: { minimum: 10 }
   validates :email, presence: true, length: { minimum: 6 }
   validates :birth_date, presence: true, length: { minimum: 6 }
   validates :dl_number, presence: true, length: { minimum: 2 }
   validates :dl_issuedate, presence: true, length: { minimum: 2 }
   validates :dl_state, presence: true, length: { minimum: 2 }
   validates :years_experience, presence: true, inclusion: { in: [true, false] }
   validates :own_car, presence: true, inclusion: { in: [true, false] }
   validates :ssn, presence: true, length: { minimum: 9 }
   validates :full_time, presence: true, inclusion: { in: [true, false] }
   validates :hours_available, presence: true, length: { minimum: 2 }
   validates :driving_violations, presence: true, length: { minimum: 2 }
   validates :criminal_records, presence: true, length: { minimum: 2 }
   validates :professional_experience, presence: true, length: { minimum: 2 }
   validates :references, presence: true, length: { minimum: 2 }
end
