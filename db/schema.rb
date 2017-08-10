# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170810160545) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "jobapplications", force: :cascade do |t|
    t.string   "first_name",                              null: false
    t.string   "last_name",                               null: false
    t.string   "middle_name"
    t.string   "address",                                 null: false
    t.string   "city",                                    null: false
    t.string   "state",                                   null: false
    t.string   "zip",                                     null: false
    t.string   "phone",                                   null: false
    t.string   "email",                                   null: false
    t.string   "birth_date",                              null: false
    t.string   "dl_number",                               null: false
    t.string   "dl_issuedate",                            null: false
    t.string   "dl_state",                                null: false
    t.boolean  "years_experience",                        null: false
    t.string   "ssn",                                     null: false
    t.string   "emergency_contact_name"
    t.string   "emergency_contact_phone"
    t.boolean  "own_car",                 default: false, null: false
    t.integer  "car_year"
    t.string   "car_make"
    t.string   "car_model"
    t.boolean  "livery_plates"
    t.boolean  "full_time",                               null: false
    t.string   "hours_available",                         null: false
    t.text     "driving_violations",                      null: false
    t.text     "criminal_records",                        null: false
    t.text     "professional_experience",                 null: false
    t.text     "references",                              null: false
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
  end

  create_table "pickups", force: :cascade do |t|
    t.string   "name",                             null: false
    t.string   "comment",          default: "",    null: false
    t.string   "pickup_address",                   null: false
    t.string   "pickup_city",                      null: false
    t.string   "dropoff_address",                  null: false
    t.string   "dropoff_city",                     null: false
    t.boolean  "picked_up",        default: false, null: false
    t.boolean  "dropped_off",      default: false, null: false
    t.integer  "driver_id"
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
    t.string   "appointment_time"
    t.string   "pickup_time"
    t.index ["driver_id"], name: "index_pickups_on_driver_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "first_name",                                null: false
    t.string   "last_name",                                 null: false
    t.string   "address",                                   null: false
    t.string   "city",                                      null: false
    t.string   "state",                                     null: false
    t.string   "zip",                                       null: false
    t.string   "phone",                                     null: false
    t.string   "email",                                     null: false
    t.boolean  "admin",                  default: false
    t.string   "role",                   default: "driver", null: false
    t.string   "encrypted_password",     default: "",       null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,        null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                                null: false
    t.datetime "updated_at",                                null: false
    t.string   "profile_photo"
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

end
