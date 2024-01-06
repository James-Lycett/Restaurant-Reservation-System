import React from "react";
import ErrorAlert from "../layout/ErrorAlert";
import TableCard from "./TableCard";

function TablesList({ tables, handleFinish, tablesError }) {


    if (!tables || tables.length === 0) {
        return <p>Loading tables...</p>;
    } else {
        return (
            <div>
                <ErrorAlert error={tablesError} />
                <ul className="p-0" style={{ listStyleType: "none" }}>
                    {tables.map((table) => (
                        <React.Fragment key={table.table_id}>
                            <TableCard table={table} handleFinish={() => handleFinish(table.table_id)} />
                        </React.Fragment>
                    ))}
                </ul>
            </div>
        );
    }
}

export default TablesList;
