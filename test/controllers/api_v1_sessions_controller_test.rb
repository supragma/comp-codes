# frozen_string_literal: true

require 'test_helper'

# Define tests for the sessions API controller.
class ApiV1SessionControllerTest < ActionDispatch::IntegrationTest
  test 'should succeed at signing in' do
    assert_difference('User.count') do
      post api_v1_sign_up_path,
        params: { first_name: 'first',
                  last_name: 'last',
                  phone: '1231231234',
                  email: 'test3@email.com',
                  password: 'password',
                  password_confirmation: 'password' }
    end
    post api_v1_sign_in_path,
      params: { email: 'test3@email.com',
                password: 'password' }
    assert_response :success
    json_response = JSON.parse(response.body)
    assert json_response['success']
    assert json_response['session_info']['first_name'] == 'first'
    assert json_response['session_info']['email'] == 'test3@email.com'
  end

  test 'should fail at signing in with bad password' do
    assert_difference('User.count') do
      post api_v1_sign_up_path,
        params: { first_name: 'first',
                  last_name: 'last',
                  email: 'test3@email.com',
                  phone: '1231231234',
                  password: 'password',
                  password_confirmation: 'password' }
    end
    post api_v1_sign_in_path,
      params: { email: 'test3@email.com',
                password: 'badpass' }
    assert_response :success
    json_response = JSON.parse(response.body)
    assert !json_response['success']
    assert json_response['error'] == 'Bad email or password'
  end

  test 'should fail at signing in with bad email' do
    post api_v1_sign_in_path,
      params: { email: 'bad@email.com',
                password: 'password' }
    assert_response :success
    json_response = JSON.parse(response.body)
    assert !json_response['success']
    assert json_response['error'] == 'Bad email or password'
  end

  test 'should succeed at authenticating the user' do
    assert_difference('User.count') do
      post api_v1_sign_up_path,
        params: { first_name: 'first',
                  last_name: 'last',
                  email: 'test3@email.com',
                  phone: '1231231234',
                  password: 'password',
                  password_confirmation: 'password' }
    end
    get api_v1_authenticate_session_path
    assert_response :success
    json_response = JSON.parse(response.body)
    assert json_response['success']
    assert json_response['session_info']['first_name'] == 'first'
    assert json_response['session_info']['email'] == 'test3@email.com'
  end

  test 'should fail at authenticating the user' do
    get api_v1_authenticate_session_path
    assert_response :success
    json_response = JSON.parse(response.body)
    assert !json_response['success']
   end

  test 'should succeed at signing out' do
    assert_difference('User.count') do
      post api_v1_sign_up_path,
        params: { first_name: 'first',
                  last_name: 'last',
                  phone: '1231231234',
                  email: 'test3@email.com',
                  password: 'password',
                  password_confirmation: 'password' }
    end
    post api_v1_sign_in_path,
      params: { email: 'test3@email.com',
                password: 'password' }
    assert_response :success
    json_response = JSON.parse(response.body)
    assert json_response['success']
    assert json_response['session_info']['first_name'] == 'first'
    assert json_response['session_info']['email'] == 'test3@email.com'

    delete api_v1_sign_out_path
    get api_v1_authenticate_session_path
    json_response = JSON.parse(response.body)
    assert_response :success
    assert !json_response['success']
  end


end
