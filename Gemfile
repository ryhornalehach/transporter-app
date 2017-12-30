source 'https://rubygems.org/'
ruby "2.3.3"

gem 'rails', '5.0.0.1'
gem 'pg', '~> 0.15'
gem 'puma'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'jquery-rails'
gem 'listen'
gem "devise"  # autentication
gem "carrierwave" # uploading files gem
gem 'fog'   # cloud service library (needed for AWS)
gem 'materialize-sass'  # adding materialize css
gem 'will_paginate', '~> 3.1.0' # pagination gem
gem "roo", "~> 2.7.0" # working with XLS files
gem 'google-api-client' # working with Google Sheets

group :development, :test do
  gem 'capybara'
  gem 'dotenv-rails'  # handling the environmental variables
  gem 'factory_girl_rails'
  gem 'rspec-rails', '~> 3.0'
  gem 'rails-controller-testing'
  gem 'pry-rails'
  gem 'shoulda'
  gem 'valid_attribute'
  gem "faker", github: "stympy/faker"
  gem 'mailcatcher' # testing the mail sending functionality
end

group :test do
  gem 'coveralls', require: false # adding coveralls badge
  gem 'database_cleaner'  # database cleaner for test environment
end

group :production do
  gem 'rails_12factor'
end
