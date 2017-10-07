class AddStatusToDays < ActiveRecord::Migration[5.0]
  def change
    add_column :days, :status, :string
  end
end
