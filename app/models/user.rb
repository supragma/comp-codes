class User < ApplicationRecord
  has_secure_password

  validates :email, presence: true, uniqueness: { case_sensitive: false }
  validates :password, presence: true

  # Return the user's full name.
  def full_name
    "#{first_name} #{last_name}"
  end
end
