import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Dashboard from "../dashboard/Dashboard";
import CreateReservation from "../reservations/CreateReservation";
import NotFound from "./NotFound";
import CreateTable from "../tables/CreateTable";
import SeatReservations from "../reservations/SeatReservations";
import EditReservation from "../reservations/EditReservation";
import Search from "../search/Search";
import EditTable from "../tables/EditTable";
import Instructions from "../Instructions/Instructions";


/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="/reservations/new">
        <CreateReservation />
      </Route>
      <Route path="/tables/new" >
        <CreateTable />
      </Route>
      <Route path="/tables/:tableId/edit">
        <EditTable />
      </Route>
      <Route path="/reservations/:reservation_id/seat">
        <SeatReservations />
      </Route>
      <Route path="/reservations/:reservation_id/edit" >
        <EditReservation />
      </Route>
      <Route path="/search" >
        <Search />
      </Route>
      <Route path="/instructions">
        <Instructions />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
