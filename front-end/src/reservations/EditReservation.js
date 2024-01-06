import React, { useCallback, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { readReservationById, updateReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";

// 'reservations/:reservation-id/edit' page. Form is autofilled with reservation data

function EditReservation() {
    const [reservation, setReservation] = useState(null)
    const [error, setError] = useState(null)
    const { reservation_id } = useParams()
    const history = useHistory()

    // Fetches reservation from the API
    const loadReservation = useCallback(async () => {
        const abortController = new AbortController()

        try {
            const response = await readReservationById(reservation_id, abortController.signal)
            setReservation(response)
        } catch (error) {
            setError(error)
        } finally {
            abortController.abort()
        }
    }, [setReservation, reservation_id])

    useEffect(loadReservation, [loadReservation])

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

    // PUTs updated reservation data to the API then returns to the dashboard at this reservation date
    // Stays on this page if the API responds with an error
    async function handleSubmit(event) {
        event.preventDefault()
        const abortController = new AbortController()

        let hasError = false
        try {
            await updateReservation(reservation_id, reservation, abortController.signal)
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

    // Waits for reservation to load from API before rendering form
    if (!reservation) {
        return (<h5>Loading reservation info...</h5>)
    } else {
        return (
            <div>
                <h1>Edit Reservation</h1>
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
}


export default EditReservation