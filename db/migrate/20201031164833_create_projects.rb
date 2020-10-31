class CreateProjects < ActiveRecord::Migration[6.0]
  def change
    create_table :projects do |t|
      t.integer :site_id
      t.integer :user_id
      t.string :type
      t.string :details
      t.boolean :interior_alt
      t.boolean :exterior_alt
      t.boolean :earth_work
      t.boolean :site_improvements
      t.boolean :mech_elect_plumb
      t.boolean :sewer
      t.boolean :change_use
      t.boolean :zoning
      t.boolean :environment_concerns
      t.boolean :steep_slope

      t.timestamps
    end
  end
end
