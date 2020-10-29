# frozen_string_literal: true

require 'test_helper'

# Define tests for the users API controller.
class ApiV1UsersControllerTest < ActionDispatch::IntegrationTest
  # Define variables to be used in multiple tests.
  def setup
    @user1 = users(:one)
    @user2 = users(:two)
  end

  test 'should succeed at making a new user' do
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
  end

  test 'should fail to create the same email twice' do
    assert_no_difference('User.count') do
     post api_v1_sign_up_path,
       params: { first_name: 'first',
                 last_name: 'last',
                 email: 'test@email.com',
                 phone: '1231231234',
                 password: 'password',
                 password_confirmation: 'password' }
    end
    assert_response :success
    json_response = JSON.parse(response.body)
    assert json_response['error'].include? 'Email has already been taken'
  end

  test 'should fail to create user with password mismatch' do
    assert_no_difference('User.count') do
     post api_v1_sign_up_path,
       params: { first_name: 'first',
                 last_name: 'last',
                 email: 'test4@email.com',
                 phone: '1231231234',
                 password: 'password',
                 password_confirmation: 'badpassword' }
    end
    assert_response :success
    json_response = JSON.parse(response.body)
    assert json_response['error'].include? "Password confirmation doesn't match"
  end
end
