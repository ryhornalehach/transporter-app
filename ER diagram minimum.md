[Users|first_name|last_name|address|city|state|zip|phone|email|admin|role]
[Pickups|name|pickup_time|appointment_time|comment|phone|pickup_address|pickup_city|dropoff_address|dropoff_city|picked_up :boolean|dropped_off :boolean]
[JobApplications|first_name|last_name|middle_name|address|city|state|zip|phone|email|birth_date|DL_number|DL_issuedate|years_experience|SSN|emergency_contact_name|emergency_contact_phone|own_car|car_make|car_model|car_year|livery_plates|full_time|hours_available|driving_violations|criminal_records|professional_experience|references]
[ArchiveClients|date|name|pickup_time|appointment_time|comment|phone|pickup_address|pickup_city|dropoff_address|dropoff_city|picked_up :boolean|dropped_off :boolean|price]
[Days|date|order|driver_id|pickup_id]

[Users]->[Pickups]
[Users]<->[Days]
[Pickups]<->[Days]
