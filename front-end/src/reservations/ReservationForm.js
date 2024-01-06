import React from "react";

// Html for form used in EditReservation and CreateReservation components

function ReservationForm({ reservation, handleChange, handlePeopleChange, handleCancel, handleSubmit }) {
    return (
        <div className="mb-5">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="first_name" className="form-label">
                        First name:
                    </label>
                    <input
                    type="text"
                    className="form-control"
                    id="first_name"
                    name="first_name"
                    value={reservation.first_name}
                    onChange={handleChange}
                    required={true}
                    />
                    <div id="first_name" className="form-text">
                        <small>First name of person making reservation</small>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="last_name" className="form-label">
                        Last name:
                    </label>
                    <input
                    type="text"
                    className="form-control"
                    id="last_name"
                    name="last_name"
                    value={reservation.last_name}
                    onChange={handleChange}
                    required={true}
                    />
                    <div id="last_name" className="form-text">
                        <small>Last name of person making reservation</small>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="mobile_number" className="form-label" >
                        Mobile number:
                    </label>
                    <input
                    type="tel"
                    className="form-control"
                    id="mobile_number"
                    name="mobile_number"
                    value={reservation.mobile_number}
                    onChange={handleChange}
                    required={true}
                    />
                    <div id="mobile_number" className="form-text">
                        <small>Mobile number for reservation. Format: 123-456-7890</small>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="reservation_date" className="form-label" >
                        Reservation date:
                    </label>
                    <input
                    type="date"
                    className="form-control"
                    id="reservation_date"
                    name="reservation_date"
                    value={reservation.reservation_date}
                    onChange={handleChange}
                    required={true}
                    />
                    <div id="reservation_date" className="form-text">
                        <small>Restaurant is closed on Tuesdays</small>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="reservation_time" className="form-label" >
                        Reservation time:
                    </label>
                    <input
                    type="time"
                    className="form-control"
                    id="reservation_time"
                    name="reservation_time"
                    min="10:30"
                    max="21:30"
                    value={reservation.reservation_time}
                    onChange={handleChange}
                    />
                    <div id="reservation_time" className="form-text">
                        <small>Reservations can be made any time between 10:30am and 9:30pm</small>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="people" className="form-label" >
                        Party size:
                    </label>
                    <input
                    type="number"
                    className="form-control"
                    id="people"
                    name="people"
                    min={1}
                    value={reservation.people}
                    onChange={handlePeopleChange}
                    />
                    <div id="people" className="form-text">
                        <small>Number of people for the reservation. Must be at least 1 person.</small>
                    </div>
                </div>
                <div className="pt-3 text-end">
                <button type="submit" className="btn btn-outline-primary">Submit</button>
                    <button type="button" className="btn btn-outline-secondary ms-3" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default ReservationForm