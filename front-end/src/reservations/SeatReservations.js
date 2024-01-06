import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { listTables, updateTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

// '/reservations/:reservation_id/seat' page. Provides a dropdown menu of tables where the reservation can be seated
// Submit assigns reservation id to the selected table

function SeatReservations() {
    const [error, setError] = useState(null)
    const [tables, setTables] = useState([])
    const [tableId, setTableId] = useState("unselected")
    const history = useHistory()
    const { reservation_id } = useParams()

    useEffect(() => {
        loadTables()
    }, [])

    // Fetches all tables from the API
    async function loadTables() {
        const abortController = new AbortController()

        setError(null)
        try {
            const response = await listTables(abortController.signal)
            setTables(response)
        } catch (error) {
            setError(error)
            setTables([])
        } finally {
            abortController.abort()
        }
    }

    // Stashes the selected table's table_id
    function handleChange({ target }) {
        setTableId(target.value)
    }

    // Returns to previous page
    function handleCancel() {
        history.goBack()
    }

    // assigns reservation id to the selected table then returns to dashboard page
    async function handleSubmit(event) {
        event.preventDefault()
        const abortController = new AbortController()
        let hasError = false

        if (tableId === "unselected") {
            setError({message: "Select a table from the dropbox where the reservation will be seated then click Submit."})
            return () => abortController.abort()
        }

        try {
            await updateTable(Number(reservation_id), tableId, abortController.signal)
        } catch (er) {
            setError(er)
            hasError = true
        } finally {
            if (!hasError) {
                history.push(`/`)
            }
        }
        return () => abortController.abort()
    }

    return (
        <div>
            <h1 className="mb-3">Seat Reservation</h1>
            <ErrorAlert error={error}/>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="table_" className="form-label me-2">
                        Table: 
                    </label>
                    <select id="table_id" name="table_id" onChange={handleChange}>
                        <option value="unselected">-- Select a table --</option>
                        {tables.map((table) =>
                            <React.Fragment key={table.table_id}>
                                <option value={table.table_id}>{`${table.table_name} - Capacity: ${table.capacity}`}</option>
                            </React.Fragment>
                        )}
                    </select>
                    <div id="capacity" className="form-text">
                        <small>Select the table where this reservation will be seated.</small>
                    </div>
                </div>
                <button type="button" className="btn btn-outline-secondary me-2" onClick={handleCancel}>Cancel</button>
                <button type="submit" className="btn btn-outline-primary">Submit</button>
            </form>
        </div>
    )
}

export default SeatReservations