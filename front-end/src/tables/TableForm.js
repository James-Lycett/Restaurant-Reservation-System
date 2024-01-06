import React from "react";

function TableForm({ table, handleCancel, handleSubmit, handleChange, handleCapacityChange, handleDelete }) {
    return (
        <>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="table_name" className="form-label">
                    Table name:
                </label>
                <input
                type="text"
                className="form-control"
                id="table_name"
                name="table_name"
                value={table.table_name}
                onChange={handleChange}
                required={true}
                />
                <div id="table_name" className="form-text">
                    <small>Name for the new table. Must be at least two letters.</small>
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="capacity" className="form-label">
                    Capacity:
                </label>
                <input
                type="number"
                className="form-control"
                id="capacity"
                name="capacity"
                value={table.capacity}
                min={1}
                onChange={handleCapacityChange}
                required={true}
                />
                <div id="capacity" className="form-text">
                    <small>The Number of people the new table can seat. Must be at least one.</small>
                </div>
            </div>
            <button type="button" className="btn btn-outline-secondary me-2" onClick={handleCancel}>Cancel</button>
            <button type="submit" className="btn btn-outline-primary me-5">Submit</button>
            {handleDelete ? <button type="button" className="btn btn-outline-danger" onClick={handleDelete} >Delete Table</button> : null}
        </form>
        </>
    )
}

export default TableForm