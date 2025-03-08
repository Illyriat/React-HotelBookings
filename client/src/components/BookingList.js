import Booking from "./Bookings"


const BookingList = ({bookings, deleteBookings}) => {
    //turn arr of obj into arr of Booking component
    const BookingsComponentList = bookings.map((booking, index) => {
        return <Booking key={index} booking={booking} deleteBookings={deleteBookings}/>
    });
    return(
        <>
           <ul>{BookingsComponentList}</ul>
        </>
    );
}
export default BookingList;