import React from "react";

function Instructions() {
    return (
        <main>
            <div className="row border-bottom text-center">
                <h1 className="display-4">How To Use Reservation System</h1>
            </div>
            <div className="row h-100">
                <div className="col-md-8">
                    <section  className="mt-3">
                        <h2 className="display-6">Dashboard</h2>
                        <p>
                            The dashboard displays: 
                            <ul className="mt-1">
                                <li>A menu for navigating the site</li>
                                <li>A list of reservations for the current date displaying the reservee's info and the status of the reservation</li>
                                <li>A list of tables displaying their availability status</li>
                            </ul>
                            Use the buttons at the top of the reservations list to select the date for reservations displayed. To seat a reservation, click the 'Seat' button, select a table at which to seat the reservation, and click Submit. You will see the the table is now labelled 'Occupied'. To cancel a reservation, simply click Cancel on the reservation you would like to cancel. When a reservation is finished, click the Finish button on the table where it is seated.
                        </p>
                    </section>
                    <section  className="mt-3">
                        <h2 className="display-6">New Reservation</h2>
                        <p>Follow the instructions under the form fields to fill out the reservation info and click Submit. Clicking Cancel will return to the Dashboard without saving the reservation.</p>
                    </section>
                    <section  className="mt-3">
                        <h2 className="display-6">New Table</h2>
                        <p>Follow the instructions under the form fields to fill out the table info and click Submit. Clicking Cancel will return to the Dashboard without saving the table.</p>
                    </section>
                    <section  className="mt-3">
                        <h2 className="display-6">Search</h2>
                        <p>This page allows you to search for reservations by phone number. Enter a phone number in the format XXX-XXX-XXXX and click Find to see a list of reservations booked under that number</p>
                    </section>
                </div>
            </div>
        </main>
    )
}

export default Instructions