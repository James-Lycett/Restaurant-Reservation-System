import React from "react";
import ReservationCard from "./ReservationCard";

function ReservationsList({ reservations, setReservationsError, loadDashboard, dateDisplay, search}) {
    // Waits for reservations to load from API before rendering reservation list
    if (reservations.length === 0 && !search) {
        return (
            <>
            <h6>No reservations found.</h6>
            <p>Server spins down after a period of inactivity in order to save me money. If you don't see anything here give it a minute and reload the page.</p>
            </>
        )
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