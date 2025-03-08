import { useState } from "react";
import BookingsService from "../services/BookingsServices";
import "./BookingForm.css";

const BookingForm = ({ createBookings }) => {
    const [formData, setFormData] = useState({
        guest_name: "",
        guest_email: "",
        checked_in: false,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const onChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);

        BookingsService.postBooking(formData)
            .then((data) => {
                createBookings(data);
                setFormData({ guest_name: "", guest_email: "", checked_in: false });
            })
            .catch((err) => console.error("Error creating booking:", err))
            .finally(() => setIsSubmitting(false));
    };

    return (
        <div className="booking-form-container">
            <h2>Create a Booking</h2>
            <form onSubmit={onSubmit} className="booking-form">
                <label>Guest Name:</label>
                <input
                    type="text"
                    name="guest_name"
                    value={formData.guest_name}
                    onChange={onChange}
                    required
                />

                <label>Guest Email:</label>
                <input
                    type="email"
                    name="guest_email"
                    value={formData.guest_email}
                    onChange={onChange}
                    required
                />

                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        name="checked_in"
                        checked={formData.checked_in}
                        onChange={onChange}
                    />
                    Checked In
                </label>

                <button type="submit" className="save-button" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save"}
                </button>
            </form>
        </div>
    );
};

export default BookingForm;
