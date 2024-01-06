import React, { useState, useEffect, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom"
import ErrorAlert from "../layout/ErrorAlert";
import TableForm from "./TableForm";
import { editTable, readTableById, deleteTable } from "../utils/api";

function EditTable() {
    const [table, setTable] = useState(null)
    const [error, setError] = useState(null)
    const { tableId } = useParams()
    const history = useHistory()

    const loadTable = useCallback(async () => {
        const abortController = new AbortController()

        try {
            const response = await readTableById(tableId, abortController.signal)
            setTable(response)
        } catch (error) {
            setError(error)
        } finally {
            abortController.abort()
        }
    }, [setTable, tableId])

    useEffect(loadTable, [loadTable])

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

    async function handleSubmit(event) {
        event.preventDefault()
        const abortController = new AbortController()
        let hasError = false
        try {
            await editTable(table, tableId, abortController.signal)
        } catch (er) {
            setError(er)
            hasError = true
        } finally {
            if (!hasError) {
                history.goBack()
            }
        }
        return () => abortController.abort()
    }

    // Returns to previous page
    function handleCancel() {
        history.goBack()
    }

    async function handleDelete(event) {
        event.preventDefault()
        const abortController = new AbortController()
        let hasError = false
        try {
            await deleteTable(tableId, abortController.signal)
        } catch (er) {
            setError(er)
            hasError = true
        } finally {
            if (!hasError) {
                history.goBack()
            }
        }
        return () => abortController.abort()
    }


    if (!table) {
        return (
            <h5>Loading table info...</h5>
        )
    } else {
        return (
            <>
            <div>
                <h1>Edit Table</h1>
                <ErrorAlert error={error}/>
            </div>
            <div>
                <TableForm
                table={table}
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
                handleChange={handleChange}
                handleCapacityChange={handleCapacityChange}
                handleDelete={handleDelete}
                />
            </div>
            </>
        )
    }
}

export default EditTable