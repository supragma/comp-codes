module Api
  module V1
    class ProjectController < ParentController
      def create
        if session['user_id'].nil?
          raise 'User not logged in'
        end
        if site_id_does_not_belong_to_user? params['site_id']
          raise 'Bad site ID'
        end
        user = Project.create!(site_id: params['site_id'],
                               user_id: session['user_id'],
                               project_type: params['type'],
                               details: params['details'],
                               interior_alt: params['interior_alt'] == "Yes",
                               exterior_alt: params['exterior_alt'] == "Yes",
                               earth_work: params['earth_work'] == "Yes",
                               site_improvements:
                                 params['site_improvements'] == "Yes",
                               mech_elect_plumb:
                                  params['mech_elect_plumb'] == "Yes",
                               sewer: params['sewer'] == "Yes",
                               change_use: params['change_use'] == "Yes",
                               zoning: params['zoning'] == "Yes",
                               environment_concerns:
                                 params['environment_concerns'] == "Yes",
                               steep_slope: params['steep_slope'] == "Yes")
        render status: 200, json: { success: true }
      rescue ActiveRecord::RecordInvalid => e
        render json: { success: false, error: e.message }, status: 200
      rescue Exception => e
        render json: { success: false, error: e.message }, status: 200
      end

      private

      def site_id_does_not_belong_to_user?(site_id)
        site = Site.find_by_id(site_id)
        if site.nil?
          return true
        elsif site.user_id == session['user_id']
          return false
        else
          return true
        end
      end
    end
  end
end
