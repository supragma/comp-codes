class Site < ApplicationRecord
  validates :address, presence: true
  validates :city, presence: true
  validates :state, presence: true
  validates :zip, presence: true
  validates :location_type, presence: true
  validates :lot_size, presence: true
end
