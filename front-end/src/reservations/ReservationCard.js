import React from "react";
import { updateReservationStatus } from "../utils/api";

function ReservationCard({ reservation, setReservationsError, loadDashboard, dateDisplay }) {
    const {
        reservation_date,
        reservation_time,
        first_name,
        last_name,
        people,
        mobile_number,
        status,
        reservation_id
    } = reservation

    // Cancel button updates reservation status to 'cancelled' then reloads the reservations list (which excludes cancelled reservations)
    async function handleCancel() {
        if (window.confirm("Do you want to cancel this reservation? This cannot be undone.")) {
            const abortController = new AbortController();
            try {
                await updateReservationStatus(reservation_id, abortController.signal);
                // Wait for finishTable to complete before reloading tables
            } catch (error) {
                setReservationsError(error);
            } finally {
                await loadDashboard();
                abortController.abort();
            }
        }
    }

    if (status === "booked" || status === "seated") {
        return (
            <>
            <li className="mt-3">
                <div className="card">
                    <div className="card-header">
                        {reservation_time}
                    </div>
                    {dateDisplay ? 
                        <div className="card-header">
                            {reservation_date}
                        </div> :
                        null
                    }
                    <div className="card-body">
                        <h5 className="card-title">{first_name + " " + last_name}</h5>
                        <h6 className="card-subtitle mb-2 text-body-secondary">{`Party of ${people}`}</h6>
                        <p className="card-text">{mobile_number}</p>
                        <p className="card-text" data-reservation-id-status={reservation.reservation_id} >{`Status: ${status}`}</p>
                        {status !== "seated" ? 
                        <a href={`/reservations/${reservation.reservation_id}/seat`} className="btn btn-outline-primary me-3">Seat</a> :
                        null
                        }
                        <a href={`/reservations/${reservation_id}/edit`} className="btn btn-outline-secondary me-3">Edit</a>
                        <button type="button" className="btn btn-outline-danger" onClick={handleCancel} data-reservation-id-cancel={reservation.reservation_id}>Cancel</button>
                    </div>
                </div>
            </li>
            </>
        )
    } else {
        return null
    }
}

export default ReservationCard