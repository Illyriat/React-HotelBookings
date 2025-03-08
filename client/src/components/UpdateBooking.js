import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BookingsService from "../services/BookingsServices";

const UpdateBooking = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        BookingsService.getBookingById(id)
            .then((booking) => {
                if (!booking) {
                    setError("Booking not found");
                } else {
                    setFormData(booking);
                }
            })
            .catch(() => setError("Error fetching booking"))
            .finally(() => setLoading(false));
    }, [id]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
    
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value // Ensure booleans for checkboxes
        });
    };
    

    const handleSubmit = (event) => {
        event.preventDefault();
        BookingsService.updateBooking(id, formData)
            .then(() => navigate("/")) // Redirect home after update
            .catch((err) => console.error("Error updating booking:", err));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Update Booking</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input 
                    type="text"
                    name="guest_name"
                    value={formData?.guest_name || ""}
                    onChange={handleChange}
                    required
                />
                <br />
                <label>Email:</label>
                <input 
                    type="email"
                    name="guest_email"
                    value={formData?.guest_email || ""}
                    onChange={handleChange}
                    required
                />
                <br />
                <label>Checked In:</label>
                <input 
                    type="checkbox"
                    name="checked_in"
                    checked={formData?.checked_in || false}
                    onChange={handleChange}
                />
                <br />
                <button type="submit">Update</button>
                <button type="button" onClick={() => navigate("/")}>Cancel</button>
            </form>
        </div>
    );
};

export default UpdateBooking;
