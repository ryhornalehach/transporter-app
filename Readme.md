![Build Status](https://codeship.com/projects/6c375940-5823-0135-2444-6619bdfa7b53/status?branch=master)

# Developed by: Ryhor (Greg) Nalehach
# Hi, it's Greg. On my previous job in transportation company I always wanted to have an application that will help me to manage the drivers and at the same time will help the drivers to be more organized in their job. That’s why I built this Transporter App.
# I built this app using Ruby on Rails back end and React.js front end. I also used Materialize framework for dynamic styling and parallax effect on the main page.
# My application allows the driver to log in and go to their private page. Driver will see only assigned to him or her clients thanks to internal API calls. The main feature is that the driver can only navigate to the next client and must confirm successful pickup and drop off of the client.  Only after confirmed pickup, the driver will see the client’s destination address. And after confirmed drop off the driver will get the next client’s pickup address. This system will eliminate possible mistakes and confusion in client’s pickup order.
# Additionally, I've successfully implemented Google Maps API so that a map with the trip is displayed on a client's show page.
# In Transporter, I’ve added the manager’s functionality, so that managers can see the list of all clients and can assign clients to the specific driver. Also, manager can see the current progress of each driver: which clients has been picked up, and which has not been picked up.
# Managers and drivers can search through the list of clients, so they are able to easily find the client.
# As a side feature, I added a new drivers application. So that new potential employees can easily find the information about current open positions and fill the job application.
# Also, my app is mobile-friendly, which is crucial due to the specifics of the business.


# Technologies used in the app:
  1. Ruby on Rails
  2. React.js
  3. PostgreSQL database
  4. Materialize Framework
  5. Application deployed in production using Heroku
  6. Amazon Web Services (S3) with Carrierwave gem for photo uploads
  7. Devise gem for user authentication
  8. Will_paginate gem for paginating the index page

# To start the application:
  1. Bundle install ruby gems:
    $ bundle
  2. Install nmp packages:
    $ npm install
  3. Create and migrate the database:
    $ rake db:create
    $ rake db:migrate
  4. Start the server:
    $ rails s
    $ npm start
  5. Test with Rspec:
    $ rake db:test:prepare
    $ rake
