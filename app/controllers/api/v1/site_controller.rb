module Api
  module V1
    class SiteController < ParentController
      def create
        if session['user_id'].nil?
          raise 'User not logged in'
        end 
        user = Site.create!(user_id: session[:user_id],
                            address: params['address'],
                            city: params['city'],
                            zip: params['zip'],
                            state: params['state'],
                            location_type: params['location_type'],
                            lot_size: params['lot_size'])
        render status: 200, json: { success: true }
      rescue ActiveRecord::RecordInvalid => e
        render json: { success: false, error: e.message }, status: 200
      rescue Exception => e
        render json: { success: false, error: e.message }, status: 200
      end
    end
  end
end
