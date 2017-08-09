[Users|first_name|last_name|address|city|state|zip|phone|email|profile_photo|hourly_rate|comments]
[Pickups|name|pickup_time|appointment_time|comment|phone|pickup_address|pickup_city|dropoff_address|dropoff_city|picked_up :boolean|dropped_off :boolean|price]
[DriverDays|year|month|day]
[Shifts|user_id|start_time|finish_time|travel_time|started: boolean|finished: boolean]
[Cars|comments|buy_price|color]
[JobApplications|first_name|last_name|middle_name|address|city|state|zip|phone|email|birth_date|DL_number|DL_issuedate|years_experience|SSN|emergency_contact_name|emergency_contact_phone|own_car|car_make|car_model|car_year|livery_plates|full_time|hours_available|driving_violations|criminal_records|professional_experience|references]


[Users]->[Pickups]
[Users]->[Shifts]
[DriverDays]->[Shifts]
[DriverDays]<-[Users]
[Users]-[Cars]
