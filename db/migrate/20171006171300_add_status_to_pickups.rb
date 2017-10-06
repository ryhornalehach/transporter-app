class AddStatusToPickups < ActiveRecord::Migration[5.0]
  def change
    add_column :pickups, :status, :string
  end
end
