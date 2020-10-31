# frozen_string_literal: true

require 'test_helper'

# Define tests for the project API controller.
class ApiV1ProjectControllerTest < ActionDispatch::IntegrationTest
  # Define variables to be used in multiple tests.
  def setup
  end

  test 'should succeed at making a new project' do
    assert_difference('User.count') do
     post api_v1_sign_up_path,
       params: { first_name: 'first',
                 last_name: 'last',
                 email: 'test3@email.com',
                 phone: '1231231234',
                 password: 'password',
                 password_confirmation: 'password' }
    end

    assert_response :success
    json_response = JSON.parse(response.body)
    assert json_response['success']

    assert_difference('Site.count') do
      post api_v1_siteinfo_path,
        params: { address: '11301 Paso Robles',
                  city: 'Granada Hills',
                  zip: '91344',
                  state: 'CA',
                  location_type: 'Residential',
                  lot_size: '4000' }
    end

    assert_response :success
    json_response = JSON.parse(response.body)
    assert json_response['success']
    site_id = json_response['site_id']

    assert_difference('Project.count') do
      post api_v1_projectinfo_path,
        params: { site_id: site_id,
                  user_id: session['user_id'],
                  type: 'Residential',
                  details: 'Some details',
                  interior_alt: 'Yes',
                  exterior_alt: 'Yes',
                  earth_work: 'Yes',
                  site_improvements: 'Yes',
                  mech_elect_plumb: 'Yes',
                  sewer: 'Yes',
                  change_use: 'Yes',
                  zoning: 'Yes',
                  environment_concerns: 'Yes',
                  steep_slope: 'Yes'}
    end

    assert_response :success
    json_response = JSON.parse(response.body)
    assert json_response['success']
  end

  test 'should fail at making a new project because user is not logged in' do
    assert_no_difference('Project.count') do
      post api_v1_projectinfo_path,
        params: { site_id: 0,
                  user_id: 0,
                  type: 'Residential',
                  details: 'Some details',
                  interior_alt: 'Yes',
                  exterior_alt: 'Yes',
                  earth_work: 'Yes',
                  site_improvements: 'Yes',
                  mech_elect_plumb: 'Yes',
                  sewer: 'Yes',
                  change_use: 'Yes',
                  zoning: 'Yes',
                  environment_concerns: 'Yes',
                  steep_slope: 'Yes'}
    end

    assert_response :success
    json_response = JSON.parse(response.body)
    assert !json_response['success']
    assert json_response['error'] == 'User not logged in'
  end

  test 'should fail at making a new project because of a bad site id' do
    assert_difference('User.count') do
     post api_v1_sign_up_path,
       params: { first_name: 'first',
                 last_name: 'last',
                 email: 'test3@email.com',
                 phone: '1231231234',
                 password: 'password',
                 password_confirmation: 'password' }
    end

    assert_response :success
    json_response = JSON.parse(response.body)
    assert json_response['success']

    assert_difference('Site.count') do
      post api_v1_siteinfo_path,
        params: { address: '11301 Paso Robles',
                  city: 'Granada Hills',
                  zip: '91344',
                  state: 'CA',
                  location_type: 'Residential',
                  lot_size: '4000' }
    end

    assert_response :success
    json_response = JSON.parse(response.body)
    assert json_response['success']

    assert_no_difference('Project.count') do
      post api_v1_projectinfo_path,
        params: { site_id: 0,
                  user_id: session['user_id'],
                  type: 'Residential',
                  details: 'Some details',
                  interior_alt: 'Yes',
                  exterior_alt: 'Yes',
                  earth_work: 'Yes',
                  site_improvements: 'Yes',
                  mech_elect_plumb: 'Yes',
                  sewer: 'Yes',
                  change_use: 'Yes',
                  zoning: 'Yes',
                  environment_concerns: 'Yes',
                  steep_slope: 'Yes'}
    end

    assert_response :success
    json_response = JSON.parse(response.body)
    assert !json_response['success']
    assert json_response['error'] == 'Bad site ID'
  end


end
