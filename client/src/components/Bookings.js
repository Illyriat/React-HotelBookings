import React from "react";
import { useNavigate } from "react-router-dom";

const Booking = ({ booking, deleteBookings }) => {
    const navigate = useNavigate();

    const handleDelete = () => {
        deleteBookings(booking._id);
    };
    

    function handleUpdate() {
        const id = booking._id;
        navigate(`/update/${id}`);
    }

    return (
        <>
            <h4>Name: {booking.guest_name}</h4>
            <p>E-Mail: {booking.guest_email}</p>
            <p>Checked In (tick the box if checked in): {booking.checked_in ? "Yes" : "No"}</p>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleUpdate}>Update</button>
        </>
    );
};

export default Booking;

