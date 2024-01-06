const knex = require("../db/connection")

// Database CRUDL functions for tables table

function list() {
    return knex("tables")
        .select("*");
}

function create(newTable) {
    return knex("tables")
        .insert(newTable)
        .returning("*")
        .then((createdRecords) => createdRecords[0]);
}

function read(tableId) {
    return knex("tables")
        .select("*")
        .where({ table_id: tableId })
        .first();
}

function update(updatedTable) {
    return knex("tables")
        .select("*")
        .where({ table_id: updatedTable.table_id})
        .update(updatedTable, "*")
        .then((returnedData) => returnedData[0]);
}

function readReservation(reservationId) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id: reservationId})
        .first();
}

function destroy(tableId) {
    return knex("tables")
        .where({ table_id: tableId })
        .update({
            reservation_id: null,
            occupied: false
        }, "*")
        .then((returnedData) => returnedData[0]);
}

function deleteTable(tableId) {
    return knex("tables")
        .where({ table_id: tableId })
        .del(["table_id"])
}


module.exports = {
    list,
    create,
    read,
    update,
    readReservation,
    destroy,
    deleteTable
}