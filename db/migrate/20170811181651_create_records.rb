class CreateRecords < ActiveRecord::Migration[5.0]
  def change
    create_table :records do |t|
      t.integer :order
      t.integer :pickup1_id
      t.integer :pickup2_id
      t.integer :pickup3_id

      t.references :driver
      t.references :day
      t.timestamps null: false
    end
  end
end
