Rails.application.routes.draw do
  devise_for :users, :controllers => { :registrations => "users/registrations" }
  resources :users, only: [:index, :show, :destroy, :edit, :update]
  root 'static_pages#homepage'
  resources :pickups, only: [:index, :show], to: 'static_pages#index'

  namespace :api do
    namespace :v1 do
      resources :pickups, only: [:index, :show, :update]
      resources :users, only: [:index]
    end
  end
end
