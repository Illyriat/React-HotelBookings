import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookingForm from "../components/BookingForm.js";
import BookingList from "../components/BookingList.js";
import BookingsService from "../services/BookingsServices.js";

const MainContainer = () => {
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();


    // Fetch bookings when component mounts or when returning from update
    useEffect(() => {
      BookingsService.getBookings()
          .then((bookings) => setBookings(bookings))
          .catch((err) => console.error("Error fetching bookings:", err));
  }, []);
  

    // Add a new booking
    const createBookings = (newBooking) => {
        setBookings((prevBookings) => {
            // Ensure the booking is not already added
            if (prevBookings.some(b => b._id === newBooking._id)) {
                return prevBookings;
            }
            return [...prevBookings, newBooking];
        });
    };
    

    // Delete a booking
    const deleteBookings = (idToDelete) => {
        BookingsService.deleteBooking(idToDelete)
            .then(() => {
                setBookings((prevBookings) => prevBookings.filter(booking => booking._id !== idToDelete));
            })
            .catch((err) => console.error("Error deleting booking:", err));
    };
    
  
    // Navigate to update page
    const updateBooking = (id, updatedData) => {
      BookingsService.updateBooking(id, updatedData)
          .then(() => BookingsService.getBookings()) // Fetch updated data after update
          .then((updatedBookings) => {
              setBookings(updatedBookings); // Update state to reflect the new changes
              navigate("/"); // Redirect to home page
          })
          .catch((err) => console.error("Error updating booking:", err));
  };

    return (
        <>
            <BookingForm createBookings={createBookings} />
            <BookingList bookings={bookings} deleteBookings={deleteBookings} updateBooking={updateBooking} />
        </>
    );
};

export default MainContainer;
