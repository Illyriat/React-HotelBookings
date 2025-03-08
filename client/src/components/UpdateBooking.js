import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BookingsService from "../services/BookingsServices";
import "./UpdateBooking.css";

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
            [name]: type === "checkbox" ? checked : value 
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        BookingsService.updateBooking(id, formData)
            .then(() => navigate("/"))
            .catch((err) => console.error("Error updating booking:", err));
    };

    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="update-booking-container">
            <h2>Update Booking</h2>
            <form onSubmit={handleSubmit} className="booking-form">
                <label>Name:</label>
                <input 
                    type="text"
                    name="guest_name"
                    value={formData?.guest_name || ""}
                    onChange={handleChange}
                    required
                />

                <label>Email:</label>
                <input 
                    type="email"
                    name="guest_email"
                    value={formData?.guest_email || ""}
                    onChange={handleChange}
                    required
                />

                <label className="checkbox-label">
                    <input 
                        type="checkbox"
                        name="checked_in"
                        checked={formData?.checked_in || false}
                        onChange={handleChange}
                    />
                    Checked In
                </label>

                <div className="buttons">
                    <button type="submit" className="update-button">Update</button>
                    <button type="button" className="cancel-button" onClick={() => navigate("/")}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateBooking;
