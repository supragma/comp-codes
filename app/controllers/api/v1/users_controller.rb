module Api
  module V1
    class UsersController < ParentController
      def create
        # TODO Create user here
        puts "API/V1/SIGNUP"
        puts params
      end
    end

    private
    # Sanitize the user params.
      def user_params
        permitted_params =
          %i[email first_name last_name password password_confirmation]
        params.require(:user).permit(permitted_params)
      end
  end
end
