Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'pages#index'
  # Set paths for the API.
  namespace :api do
    namespace :v1 do
      # Set paths for sessions.
      post   '/sign_in',              to: 'sessions#create'
      get    '/authenticate_session', to: 'sessions#authenticate'
      delete '/sign_out',             to: 'sessions#destroy'

      # Set paths for users.
      post '/sign_up', to: 'users#create'

      # Paths for sites.
      post '/siteinfo',    to: 'site#create'
   end
  end
  get '*path', to: 'pages#index', via: :all
end
