// import express, cors, mongoDB

const express = require('express');
const app = express();
const cors = require('cors');

//Middleware
app.use(express.json());
app.use(cors());

const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js')

MongoClient.connect('mongodb://127.0.0.1:27017', { useUnifiedTopology: true })
  .then((client) => {
    const db = client.db('hotel_booking');
    const bookingsCollection = db.collection('bookings');
    const bookingsRouter = createRouter(bookingsCollection);
    app.use('/api/bookings', bookingsRouter);
  })
  .catch(console.err);

// listen for requests
app.listen(9000, function () {
    console.log(`Listening on port ${ this.address().port}`);
});