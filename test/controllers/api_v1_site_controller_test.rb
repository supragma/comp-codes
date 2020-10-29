# frozen_string_literal: true

require 'test_helper'

# Define tests for the site API controller.
class ApiV1SiteControllerTest < ActionDispatch::IntegrationTest
  # Define variables to be used in multiple tests.
  def setup
    @user1 = users(:one)
    @user2 = users(:two)
  end

  test 'should succeed at making a new site' do
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
      post api_v1_site_path,
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
  end

  test 'should fail to create a site because user is not logged in' do
    assert_no_difference('Site.count') do
      post api_v1_site_path,
        params: { address: '11301 Paso Robles',
                  city: 'Granada Hills',
                  state: 'CA',
                  location_type: 'Residential',
                  lot_size: '4000' }
    end

    assert_response :success
    json_response = JSON.parse(response.body)
    assert !json_response['success']
    assert json_response['error'] == "User not logged in"
   end

  test 'should fail to create site with missing data' do
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

    assert_no_difference('Site.count') do
      post api_v1_site_path,
        params: { address: '11301 Paso Robles',
                  city: 'Granada Hills',
                  state: 'CA',
                  location_type: 'Residential',
                  lot_size: '4000' }
    end

    assert_response :success
    json_response = JSON.parse(response.body)
    assert !json_response['success']
    assert json_response['error'] == "Validation failed: Zip can't be blank"
   end
end
