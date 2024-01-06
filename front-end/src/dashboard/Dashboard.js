import React, { useCallback, useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import useQuery from "../utils/useQuery";
import { today, previous, next } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsList from "../reservations/ReservationsList";
import TablesList from "../tables/TablesList";
import { listTables, finishTable } from "../utils/api";
const moment = require("moment")

// '/dashboard' page. Displays a list of reservations (with buttons to operate on the reservation) for a single date and a list of all tables.
// Previous, today, and next buttons allow the user to scroll through dates

function Dashboard() {
  const query = useQuery()
  let queryDate = query.get("date")
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [date, setDate] = useState(queryDate ? queryDate : today())
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  // Fetches all reservations for this date from the API
  const loadDashboard = useCallback(async () => {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError, setReservations([])) ;
    return () => abortController.abort();
  }, [date])

      // Fetches all tables from the API
      const loadTables = useCallback(async () => {
        const abortController = new AbortController();
        setTablesError(null);
  
        try {
            const newTables = await listTables(abortController.signal);
            if (!abortController.signal.aborted) {
                setTables(newTables);
            }
        } catch (error) {
            setTablesError(error);
        } finally {
            abortController.abort();
        }
    }, [setTables])

  useEffect(loadDashboard, [date, tables, loadDashboard]);


  useEffect(() => {
      loadTables()
  }, [loadTables]);

  // Updates reservation status to 'finished', table occupied to 'false', and loads the tables list again
  async function handleFinish(table_id) {
      if (window.confirm("Is this table ready to seat new guests? This cannot be undone.")) {
          const abortController = new AbortController();
          
          try {
              await finishTable(table_id, abortController.signal);
          } catch (error) {
              setTablesError(error);
          } finally {
              await loadTables();
              abortController.abort();
          }
      }
  }

  // Changes this date and the url to match
  function handleClick(button) {
    if (button === "previous") {
      setDate(previous(date))
      window.history.pushState(null, "", `/dashboard?date=${previous(date)}`)
    } else if (button === "today") {
      setDate(today())
      window.history.pushState(null, "", `/dashboard?date=${today()}`)
    } else if (button === "next") {
      setDate(next(date))
      window.history.pushState(null, "", `/dashboard?date=${next(date)}`)
    } else {
      console.error("something went wrong (handleClick, date error probably)")
    }
  }

  if (date) {
  return (
    <main>
      <div className="row border-bottom text-center">
        <h1 className="display-4">Dashboard</h1>
        <ErrorAlert error={reservationsError} />
      </div>
      <div className="row h-100">
        <div className="col-md-8">
          <div className="mb-3">
            <h4 className="mt-3">{`Reservations for ${moment(date).format("dddd LL")}`}</h4>
          </div>
          <div className="btn-group btn-group-sm w-100">
            <button type="button" className="btn btn-outline-primary mb-3 px-0 px-md-auto" onClick={() => handleClick("previous")}>Previous</button>
            <button type="button" className="btn btn-outline-primary mb-3" onClick={() => handleClick("today")}>Today</button>
            <button type="button" className="btn btn-outline-primary mb-3" onClick={() => handleClick("next")}>Next</button>
          </div>
          <div>
            <ReservationsList
            reservations={reservations}
            setReservationsError={setReservationsError}
            loadDashboard={loadDashboard}
            dateDisplay={false}
            />
          </div>
        </div>
        <div className="col-md-4">
          <h4 className="mb-3 mt-3">Tables</h4>
          <TablesList tables={tables} handleFinish={handleFinish} tablesError={tablesError}/>
        </div>
      </div>
    </main>
  )
  } else {
    return <h3>Loading Date...</h3>
  }
}

export default Dashboard;
