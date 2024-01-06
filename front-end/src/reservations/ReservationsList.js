import React from "react";
import ReservationCard from "./ReservationCard";

function ReservationsList({ reservations, setReservationsError, loadDashboard, dateDisplay}) {
    // Waits for reservations to load from API before rendering reservation list
    if (reservations.length === 0) {
        return <h6>No reservations found.</h6>
    } else {
        return (
            
                <ul className="p-0" style={{listStyleType: "none"}}>
                    {reservations.map((reservation) => (
                            <React.Fragment key={reservation.reservation_id}>
                                <ReservationCard
                                reservation={reservation}
                                setReservationsError={setReservationsError}
                                loadDashboard={loadDashboard}
                                dateDisplay={dateDisplay}
                                />
                            </React.Fragment>
                    ))}
                </ul>
            
        )
    }
}

export default ReservationsList