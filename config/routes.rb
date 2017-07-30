Rails.application.routes.draw do
  devise_for :users, :controllers => { :registrations => "users/registrations" }
  resources :users, only: [:show]
  root 'static_pages#homepage'
end
