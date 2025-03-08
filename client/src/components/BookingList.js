import React from "react";
import { useNavigate } from "react-router-dom";
import "./Bookings.css";

const Booking = ({ booking, deleteBookings }) => {
    const navigate = useNavigate();

    const handleDelete = () => {
        deleteBookings(booking._id);
    };

    const handleUpdate = () => {
        navigate(`/update/${booking._id}`);
    };

    return (
        <div className="booking-card">
            <h4>{booking.guest_name}</h4>
            <p><strong>Email:</strong> {booking.guest_email}</p>
            <p><strong>Checked In:</strong> {booking.checked_in ? "✅ Yes" : "❌ No"}</p>
            <div className="buttons">
                <button className="delete-button" onClick={handleDelete}>Delete</button>
                <button className="update-button" onClick={handleUpdate}>Update</button>
            </div>
        </div>
    );
};

const BookingsList = ({ bookings, deleteBookings }) => {
    return (
        <div className="bookings-container">
            <div className="bookings-grid">
                {bookings.length > 0 ? (
                    bookings.map((booking) => (
                        <Booking key={booking._id} booking={booking} deleteBookings={deleteBookings} />
                    ))
                ) : (
                    <p>No bookings found.</p>
                )}
            </div>
        </div>
    );
};

export default BookingsList;
