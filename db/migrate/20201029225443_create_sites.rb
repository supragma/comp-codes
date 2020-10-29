class CreateSites < ActiveRecord::Migration[6.0]
  def change
    create_table :sites do |t|
      t.string :address
      t.string :city
      t.string :zip
      t.string :location_type
      t.string :lot_size
      t.integer :user_id

      t.timestamps
    end
  end
end
