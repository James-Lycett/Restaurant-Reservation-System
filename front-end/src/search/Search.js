import React, { useState, useEffect, useCallback } from "react";
import { listReservations } from "../utils/api";
import ReservationsList from "../reservations/ReservationsList";
import ErrorAlert from "../layout/ErrorAlert";

// '/search' page. Allows user to search reservations by mobile number
// Search results are listed by time

function Search() {
    const [reservations, setReservations] = useState([])
    const [search, setSearch] = useState("")
    const [term, setTerm] = useState("")
    const [error, setError] = useState(null)


    // Sends a GET request to the API for reservations with a matching mobile_number
    function handleFind(event) {
        event.preventDefault()
        setSearch(term)
    }

    const loadReservations = useCallback(async () => {
        const abortController = new AbortController();
  
        try {
          const searchResults = await listReservations(term, abortController.signal);
          setReservations(searchResults);
        } catch (error) {
          setError(error);
        } finally {
          abortController.abort();
        }
    }, [term])

    useEffect(() => {
        if (search) {
          loadReservations();
        }
      }, [loadReservations, search]);

    // Updates search field as user types
    function handleChange({ target: { name, value }}) {
        setTerm((previousSearch) => ({
            ...previousSearch,
            [name]: value
        }))
    }

    return (
        <>
        <h1>Search</h1>
        <form className="row g-3" onSubmit={handleFind}>
            <div className="col-auto">
                <label htmlFor="mobile_number" className="visually-hidden">Search reservations by mobile number</label>
                <input type="text" name="mobile_number" className="form-control" id="mobile_number" placeholder="555-555-5555" onChange={handleChange}/>
            </div>
            <div className="col-auto">
                <button type="submit" className="btn btn-outline-primary">Find</button>
            </div>
        </form>
        <div>
            <ErrorAlert error={error} />
        </div>
        <div className="mt-3">
            <ReservationsList reservations={reservations} setReservationsError={setError} loadDashboard={loadReservations} dateDisplay={true} search={true}/>
        </div>
        </>
    )
}

export default Search