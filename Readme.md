![Build Status](https://codeship.com/projects/6c375940-5823-0135-2444-6619bdfa7b53/status?branch=master)
![Coverage Status](https://coveralls.io/repos/github/ryhornalehach/transporter-app/badge.svg?branch=master)
![Code Climate](https://codeclimate.com/github/ryhornalehach/transporter-app.png)

# Developed by: Ryhor (Greg) Nalehach
# Hi, it's Greg. On my previous job in transportation company I always wanted to have an application that will help me to manage the drivers and at the same time will help the drivers to be more organized in their job. That’s why I built this Transporter App. I built this app using Ruby on Rails back end and React.js front end. I also used Materialize framework for dynamic styling and parallax effect on the main page.
# My application allows the driver to log in and go to their private page. I Used Devise gem for logging in feature. Driver will see only assigned to him or her clients thanks to internal API calls. Also I used CarrierWave gem so that users can upload their profile photos. The main feature is that the driver can only navigate to the next client and must confirm successful pickup and drop off of the client.  Only after confirmed pickup, the driver will see the client’s destination address. And after confirmed drop off the driver will get the next client’s pickup address. This system will eliminate possible mistakes and confusion in client’s pickup order.
# In Transporter, I’ve added the manager’s functionality, so that managers can see the list of all clients and can assign clients to the specific driver. Also, manager can see the current progress of each driver: which clients has been picked up, and which has not been picked up. Additionally, by using ActionMailer I implemented the feature of sending email notifications in case if a client wasn’t picked up on time.
# Additionally, I've successfully implemented Google Maps API so that a map is displayed on a client's show page.
# As a side feature, I added a new drivers application. So that new potential employees can easily find the information about current open positions and fill the job application.


# Technologies used in the app:
  1. Ruby on Rails
  2. React.js
  3. Materialize Framework
  4. Application deployed in production using Heroku

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
