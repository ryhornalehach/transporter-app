# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.create(first_name: 'John', last_name: 'Smith', address: '100 Main st.', city: 'Lowell', state: 'MA', zip: '01802', phone: '857-123-1234', email: 'jsmith@test.com', password: 'greg123')
User.create(first_name: 'Jack', last_name: 'Sparrow', address: '99 Water st.', city: 'Watertown', state: 'MA', zip: '02340', phone: '617-123-1234', email: 'jsparrow@test.com', password: 'greg123')
User.create(first_name: 'Sam', last_name: 'Brown', address: '10 Wheeler cir.', city: 'Stoughton', state: 'MA', zip: '02072', phone: '617-123-1111', email: 'sbrown@test.com', password: 'greg123')
