const knex = require("../db/connection")

// Database CRUDL functions for reservations table

function list(reservation_date) {
        return knex("reservations")
            .select("*")
            .where({ reservation_date: reservation_date })
            .whereIn("status", ["booked", "seated"])
            .orderBy("reservation_time");
}

function search(mobile_number) {
    return knex("reservations")
    .whereRaw(
        "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

function create(newReservation) {
    return knex("reservations")
        .insert(newReservation)
        .returning("*")
        .then((createdRecords) => createdRecords[0]);
}

function read(reservationId) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id: reservationId})
        .first();
}

function update(updatedReservation) {
    return knex("reservations")
        .where({ reservation_id: updatedReservation.reservation_id })
        .update({ ...updatedReservation }, "*")
        .then((returnedData) => returnedData[0])
}


module.exports = {
    list,
    search,
    create,
    read,
    update
}