import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";

// 'reservations/new' page. Blank form, submit creates a new reservation

function CreateReservation() {
    const initialReservationState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 1,
    }
    const history = useHistory()
    const [ error, setError ] = useState(null)
    const [ reservation, setReservation ] = useState({ ...initialReservationState })

    // Adds form data to appropriate reservation property as the user types
    function handleChange({ target: { name, value }}) {
        setReservation((previousReservation) => ({
            ...previousReservation,
            [name]: value
        }))
    }

    // Converts 'people' value from a string to a number (to satisfy API requirements) before adding to reservation
    function handlePeopleChange({ target: { name, value }}) {
        const numberOfPeople = Number(value)

        setReservation((previousReservation) => ({
            ...previousReservation,
            people: numberOfPeople
        }))
    }

    // Returns to previous page
    function handleCancel() {
        history.goBack()
    }

    // POSTs new reservation data to the API then returns to the dashboard at this reservation date
    // Stays on this page if the API responds with an error
    async function handleSubmit(event) {
        event.preventDefault()
        let hasError = false
        const abortController = new AbortController()

        try {
            await createReservation(reservation, abortController.signal)
        } catch (er) {
            setError(er)
            hasError = true
        } finally {
            abortController.abort()
            if (!hasError) {
                history.push(`/dashboard?date=${reservation.reservation_date}`)
            }
        }
    }

    return (
        <div>
            <h1>New Reservation</h1>
            <ErrorAlert error={error}/>
            <ReservationForm
                reservation={reservation}
                handleChange={handleChange}
                handlePeopleChange={handlePeopleChange}
                handleCancel={handleCancel}
                handleSubmit={handleSubmit}
            />
        </div>
    )
}

export default CreateReservation