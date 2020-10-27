module Api
  module V1
    class UsersController < ParentController
      def create
        puts "API/V1/SIGNUP"
        puts params
      end
    end
  end
end
