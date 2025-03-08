import { useState } from "react";
import BookingsService from "../services/BookingsServices";

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
        if (isSubmitting) return; // Prevent double submission
        setIsSubmitting(true);

        BookingsService.postBooking(formData)
            .then((data) => {
                createBookings(data);
                setFormData({ guest_name: "", guest_email: "", checked_in: false });
            })
            .catch((err) => console.error("Error creating booking:", err))
            .finally(() => setIsSubmitting(false)); // Re-enable button
    };

    return (
        <form onSubmit={onSubmit}>
            <p>Guest Name: </p>
            <input type="text" name="guest_name" value={formData.guest_name} onChange={onChange} required />
            <p>Guest Email: </p>
            <input type="email" name="guest_email" value={formData.guest_email} onChange={onChange} required />
            <p>Checked In: </p>
            <input type="checkbox" name="checked_in" checked={formData.checked_in} onChange={onChange} />
            <button type="submit" disabled={isSubmitting}>Save</button>
        </form>
    );
};

export default BookingForm;
