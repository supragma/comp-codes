class AddStateToSite < ActiveRecord::Migration[6.0]
  def change
    add_column :sites, :state, :string
  end
end
