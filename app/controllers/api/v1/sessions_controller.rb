module Api
  module V1
    class SessionsController < ParentController
      # Sign in API. Creates a new session.
      def create
        user = User.find_by_email(params['email')
        if user && user.authenticate(params['password'])
          session[:user_id] = user.id
          render status: 200, json: { success: true }
        else
          render status: 200, json: { success: false,
                                      error: 'Bad email or password' }
        end
      rescue ActiveRecord::RecordInvalid => e
        render json: { success: false, error: e.message }, status: 200
      end

      # See if user is authenticated.
      def authenticate
        user = User.find_by_id(session[:user_id])
        if user
          render json: { success: true, session_info: session_info(user) }, 
                 status: 200
        else
          render json: { success: false }, status: 200
        end
      end

      private

      def session_info(user)
        return { email: user.email, first_name: user.first_name }
      end
    end
  end
end
