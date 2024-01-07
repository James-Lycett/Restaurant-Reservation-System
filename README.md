# Restaurant Reservation System
Restaurant Reservation System is a demo web app for booking restaurant reservations and updating reservation status through entire cycle of book, cancel, seat, and finish.

## Links
https://restaurantreservationsystem-frontend-a4jh.onrender.com/dashboard

## Technology
 - JavaScript
 - Node.js
 - React
 - React Native
 - React Router
 - Bootstrap
 - Express
 - PostgreSQL
 - Knex
The app is deployed using Render

## How to use Restaurant Reservation System
### Dashboard
The dashboard displays:
 - A menu for navigating the site
 - A list of reservations for the current date displaying the reservee's info and the status of the reservation
 - A list of tables displaying their availability status

Use the buttons at the top of the reservations list to select the date for reservations displayed.
To seat a reservation, click the 'Seat' button, select a table at which to seat the reservation, and click Submit. You will see the the table is now labelled 'Occupied'.
To cancel a reservation, simply click Cancel on the reservation you would like to cancel.
When a reservation is finished, click the Finish button on the table where it is seated.

### New Reservation
Follow the instructions under the form fields to fill out the reservation info and click Submit.
Clicking Cancel will return to the Dashboard without saving the reservation.

### New Table
Follow the instructions under the form fields to fill out the table info and click Submit.
Clicking Cancel will return to the Dashboard without saving the table.

### Search
This page allows you to search for reservations by phone number. 
Enter a phone number in the format XXX-XXX-XXXX and click Find to see a list of reservations booked under that number

