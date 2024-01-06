import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import TableForm from "./TableForm";

// '/tables/new' page. Blank form, submit creates a new table

function CreateTable() {
    const initialTableState = {
        table_name: "",
        capacity: ""
    }
    const [table, setTable] = useState(initialTableState)
    const [error, setError] = useState(null)
    const history = useHistory()

    // Adds form data to appropriate table property as the user types
    function handleChange({ target: { name, value }}) {
        setTable((previousTable) => ({
            ...previousTable,
            [name]: value
        }))
    }

    // Converts 'capacity' value from a string to a number (to satisfy API requirements) before adding to table
    function handleCapacityChange({ target: { value }}) {
        const capacityNumber = Number(value)
        setTable((previousTable) => ({
            ...previousTable,
            capacity: capacityNumber
        }))
    }

    // Returns to previous page
    function handleCancel() {
        history.goBack()
    }

    // POSTs new table data to the APIthen returns to the dashboard
    // Stays on this page if the API responds with an error
    async function handleSubmit(event) {
        event.preventDefault()
        const abortController = new AbortController()
        let hasError = false
        try {
            await createTable(table, abortController.signal)
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
                <h1>New Table</h1>
                <ErrorAlert error={error}/>
                <TableForm 
                    table={table}
                    handleSubmit={handleSubmit}
                    handleCancel={handleCancel}
                    handleChange={handleChange}
                    handleCapacityChange={handleCapacityChange}
                    handleDelete={null}
                />
            </div>
        )
}

export default CreateTable