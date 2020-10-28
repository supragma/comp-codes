class User < ApplicationRecord
  has_secure_password

  validates :email, presence: true, uniqueness: true
  validates :password, presence: true

  # Return the user's full name.
  def full_name
    "#{first_name} #{last_name}"
  end
end
