Rails.application.routes.draw do
  devise_for :users, :controllers => { :registrations => "users/registrations" }
  resources :users, only: [:index, :show, :destroy, :edit, :update]
  resources :jobapplications
  resources :imports, only: [:new, :create]
  root 'static_pages#homepage'
  resources :pickups, only: [:index, :show], to: 'static_pages#index'
  resources :drivers, only: [:index, :show], to: 'static_pages#index'
  resources :days, only: [:index, :show], to: 'static_pages#index'

  namespace :api do
    namespace :v1 do
      resources :pickups, only: [:index, :show, :update]
      resources :users, only: [:index, :update, :show]
      resources :days, only: [:index, :show, :update]
      resources :records, only: [:update]
    end
  end
end
