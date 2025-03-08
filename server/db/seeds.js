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
    },
    {
        guest_name: "Steve Rogers",
        guest_email: "OldManRogers@AOL.com",
        checked_inStatus: false
    },
    {
        guest_name: "Natasha Romanoff",
        guest_email: "Nat@WiddowMaker.com",
        checked_inStatus: true
    },
    {
        guest_name: "Clint Barton",
        guest_email: "Archer@gmail.com",
        checked_inStatus: false
    },
    {
        guest_name: "Thor Odinson",
        guest_email: "hello-jane@hotmail.com",
        checked_inStatus: true
    },
    {
        guest_name: "Wanda Maximoff",
        guest_email: "Wanda@Scarlett.Witch",
        checked_inStatus: false
    },
    {
        guest_name: "Vision",
        guest_email: "Vision@AI-Overlord.skynet",
        checked_inStatus: true
    },
])