source 'https://rubygems.org/'
ruby "2.3.3"

gem 'rails', '5.0.0.1'
gem 'pg', '~> 0.15'
gem 'puma'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'jquery-rails'
gem 'listen'
gem "devise"
gem 'materialize-sass'
gem 'will_paginate', '~> 3.1.0'

group :development, :test do
  gem 'capybara'
  gem 'dotenv-rails'
  gem 'factory_girl_rails'
  gem 'rspec-rails', '~> 3.0'
  gem 'pry-rails'
  gem 'shoulda'
  gem 'valid_attribute'
  gem "faker", github: "stympy/faker"
  gem 'mailcatcher'
end

group :test do
  gem 'coveralls', require: false
  gem 'database_cleaner'
end

group :production do
  gem 'rails_12factor'
end
