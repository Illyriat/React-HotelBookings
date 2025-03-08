const baseURL = "http://localhost:9000/api/bookings/";

const BookingsService = {
    // Get all bookings
    getBookings() {
        return fetch(baseURL).then(res => res.json());
    },

    // Get a specific booking by ID
    getBookingById(id) {
        return fetch(`${baseURL}${id}`).then(res => res.json());
    },

    // Post a new booking
    postBooking(payload) {
        return fetch(baseURL, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: { "Content-Type": "application/json" }
        }).then(res => res.json());
    },

    // Update an existing booking
    updateBooking(id, updatedData) {
        const dataToUpdate = { ...updatedData };
        delete dataToUpdate._id;
    
        return fetch(`${baseURL}${id}`, {
            method: "PUT",
            body: JSON.stringify(dataToUpdate),
            headers: { "Content-Type": "application/json" },
        }).then((res) => res.json());
    },
    

    // Delete a booking
    deleteBooking(id) {
        return fetch(`${baseURL}${id}`, { method: "DELETE" })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to delete booking");
                }
                return res.json();
            })
            .catch(err => console.error("Error deleting booking:", err));
    },
    
  
};

export default BookingsService;
