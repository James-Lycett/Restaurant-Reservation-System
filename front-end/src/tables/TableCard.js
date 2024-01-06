import React from "react";
import { Link } from "react-router-dom"


function TableCard({ table, handleFinish }) {
    const { table_name, capacity, occupied } = table

    return (
        <>
            <li>
                <div className="card mb-3" style={{ width: "18rem" }}>
                    <div className="card-header">
                        {table_name}
                    </div>
                    <div className="card-body">
                        <h5 className="card-title" data-table-id-status={table.table_id} >{occupied ? "Occupied" : "Free"}</h5>
                        <h6 className="card-subtitle mb-2 text-body-secondary" >{`Seats up to ${capacity} people`}</h6>
                        {occupied ?
                        <button
                            className="btn btn-outline-primary"
                            onClick={handleFinish}
                            data-table-id-finish={table.table_id}
                            >
                                Finish
                        </button>
                        :
                        null
                        }
                        <Link to={`/tables/${table.table_id}/edit`} className="btn btn-outline-secondary ms-2" >Edit Table</Link>
                    </div>
                </div>
            </li>
        </>
    )
}

export default TableCard