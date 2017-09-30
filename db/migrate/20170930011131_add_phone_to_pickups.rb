class AddPhoneToPickups < ActiveRecord::Migration[5.0]
  def change
    add_column :pickups, :phone, :string
  end
end
