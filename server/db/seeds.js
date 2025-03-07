use hotel_booking;
db.dropDatabase();

db.bookings.insertMany([
    {
        guest_name: "Peter Parker",
        guest_email: "the_man@spiderman.com",
        checked_inStatus: true
    },
    {
        guest_name: "Tony Stark",
        guest_email: "tony@stark_industries.io",
        checked_inStatus: false
    },
    {
        guest_name: "Bruce Banner",
        guest_email: "banner@hulk.smash",
        checked_inStatus: true
    }
])