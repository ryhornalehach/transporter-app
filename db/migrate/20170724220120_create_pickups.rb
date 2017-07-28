class CreatePickups < ActiveRecord::Migration[5.0]
  def change
    create_table :pickups do |t|
      t.string :name, null: false
      t.string :pickup_time, null: false
      t.string :appointment_time, null: false, default: '0000A'
      t.string :comment, null: false, default: ''
      t.string :pickup_address, null: false
      t.string :pickup_city, null: false
      t.string :dropoff_address, null: false
      t.string :dropoff_city, null: false
      t.boolean :picked_up, null: false, default: false
      t.boolean :dropped_off, null: false, default: false

      t.references :driver
      t.timestamps null: false
    end
  end
end
