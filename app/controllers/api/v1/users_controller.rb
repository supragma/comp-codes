module Api
  module V1
    class UsersController < ParentController
      def create
        user = User.create!(email: params['email'].downcase,
                            first_name: params['first_name'],
                            last_name: params['last_name'],
                            phone: params['phone'],
                            password: params['password'],
                            password_confirmation: params['password_confirmation'])
        # Create a session for this user.
        session[:user_id] = user.id
        # TODO send welcome email
        render status: 200, json: { success: true }
      rescue ActiveRecord::RecordInvalid => e
        render json: { success: false, error: e.message }, status: 200
      end
    end
  end
end
