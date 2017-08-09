class CreateJobapplications < ActiveRecord::Migration[5.0]
  def change
    create_table :jobapplications do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :middle_name
      t.string :address, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.string :zip, null: false
      t.string :phone, null: false
      t.string :email, null: false
      t.string :birth_date, null: false
      t.string :dl_number, null: false
      t.string :dl_issuedate, null: false
      t.string :dl_state, null: false
      t.boolean :years_experience, null: false
      t.string :ssn, null: false
      t.string :emergency_contact_name
      t.string :emergency_contact_phone
      t.boolean :own_car, null: false, default: false
      t.integer :car_year
      t.string :car_make
      t.string :car_model
      t.boolean :livery_plates
      t.boolean :full_time, null: false
      t.string :hours_available, null: false
      t.text :driving_violations, null: false
      t.text :criminal_records, null: false
      t.text :professional_experience, null: false
      t.text :references, null: false

      t.timestamps null: false
    end
  end
end
