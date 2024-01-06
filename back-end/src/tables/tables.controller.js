const service = require("./tables.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const { table } = require("../db/connection")
const reservationsService = require("../reservations/reservations.service")

// CRUDL functions for /tables routes

// GET requests to /tables will return a list of all tables
async function list(req, res, next) {
    const data = await service.list()

    res.json({ data })
}

// Validates request body has data
function bodyHasData(req, res, next) {
    const data = req.body.data
  
    if (!data) {
      return next({
        status: 400,
        message: `Request body must have data property.`
      })
    } else {
      next()
    }
  }

// Validates request body has all required properties
function validateBodyHasRequiredProperties(req, res, next) {
    const bodyProperties = Object.keys(req.body.data)
    let validBodyProperties = [            
            "reservation_id",
            "table_name",
            "capacity",
            "occupied",
    ]

    if (req.method === "PUT") {
        validBodyProperties = ["reservation_id"]
    }

    if (bodyProperties.some((key) => !validBodyProperties.includes(key))) {
        return next({
            status: 400,
            message: `Request body has invalid properties or is missing required properties. Valid properties are: ${validBodyProperties}. Properties received were: '${bodyProperties}'`
        })
    } else {
        next()
    }
}

// Validates request body table_name value is a string
function validateTableName(req, res, next) {
    const { table_name } = req.body.data

    if (!table_name || typeof table_name !== "string" || table_name.length < 2) {
        return next({
            status: 400,
            message: `table_name must be a string more than one character long. Received: ${table_name} - Type: ${typeof table_name}`
        })
    } else {
        next()
    }
}

// Validates request body capacity value is a number
function validateCapacity(req, res, next) {
    const { capacity } = req.body.data

    if (typeof capacity !== "number" || capacity < 1) {
        return next({
            status: 400,
            message: `capacity must be a non-zero number. Received: ${capacity} - Type: ${typeof capacity}`
        })
    } else {
        next()
    }
}

// Validates request body occupied value is a boolean
function validateOccupiedProperty(req, res, next) {
    const { occupied } = req.body.data

    if (occupied && typeof occupied !== "boolean") {
        return next({
            status: 400,
            message: `occupied must be a boolean. Received: ${occupied} - Type: ${typeof occupied}`
        })
    } else {
        next()
    }
}

// POST requests will create a new table and return the created table
async function create(req, res, next) {
    let newTable = req.body.data

    if (newTable.hasOwnProperty("reservation_id")) {
        newTable = {
            ...newTable,
            occupied: true
        }
    }
    
    const data = await service.create(newTable)

    res.status(201).json({ data })
}

// Validates that a table with the given tableId exists
async function tableExists(req, res, next) {
    const { tableId } = req.params
    const data = await service.read(tableId)

    if (!data) {
        return next({
            status: 404,
            message: `Table with table_id '${tableId}' does not exist`
        })
    } else {
        res.locals.table = data
        next()
    }
}

// GET requests to /tables/:tableId will return a single table with the given id
function read(req, res, next) {
    const data = res.locals.table

    res.json({ data })
}

// Checks if reservation exists at given reservation_id
async function reservationIdExists(req, res, next) {
    const { reservation_id } = req.body.data
    const data = await reservationsService.read(reservation_id)

    if (!data) {
        return next({
            status: 404,
            message: `Reservation does not exist. Received reservation_id: '${reservation_id}'`
        })
    } else {
        res.locals.reservation = data
        return next()
    }
}

// Validates request body reservation_id value is not empty and is a number
function validateReservationId(req, res, next) {
    const { reservation_id } = req.body.data

    if (!reservation_id || typeof reservation_id !== "number") {
        return next({
            status: 400,
            message: `Request must have reservation_id, and it must be a number. Received: ${reservation_id} - Type: ${typeof reservation_id}`
        })
    } else {
        next()
    }
}

// Checks if the number of people on the reservation being seated exceeds table capacity
async function validateNumberOfPeople(req, res, next) {
    const existingTable = res.locals.table
    const numberOfPeople = res.locals.reservation.people

    if (numberOfPeople > existingTable.capacity) {
        return next({
            status: 400,
            message: `Number of people for reservation '${numberOfPeople}' exceeds table capacity '${existingTable.capacity}'`
        })
    } else {
        return next()
    }
}

// Checks if the table to be seated is occupied already
function validateNotOccupied(req, res, next) {
    const existingTable = res.locals.table

    if (existingTable.occupied) {
        return next({
            status: 400,
            message: `Table '${existingTable.table_name}' is currently occupied`
        })
    } else {
        return next()
    }
}

// Checks if reservation being seated already has status "seated"
function validateSeatedReservation(req, res, next) {
    const reservation = res.locals.reservation
    
    if (reservation.status === "seated") {
        return next({
            status: 400,
            message: `Reservation is already seated`
        })
    } else {
        return next()
    }

}

// PUT requests to /tables/:tableId/seat will update the table's 'occupied' status and return the table
async function update(req, res, next) {
    const { reservation_id } = req.body.data
    const existingTable = res.locals.table
    const reservation = res.locals.reservation
    const updatedTable = {
        ...existingTable,
        reservation_id: reservation_id,
        occupied: true,
    }

    const tableData = await service.update(updatedTable)

    await reservationsService.update({ ...reservation, status: "seated"})

    res.json({ tableData })
}

// Checks if table is occupied before deleting
async function tableIsOccupied(req, res, next) {
    const { tableId } = req.params
    const table = await service.read(tableId)

    if (!table.occupied) {
        return next({
            status: 400,
            message: `Cannot finish (delete) a table that is not occupied.`
        })
    } else {
        return next()
    }
}

// Deletes a table when no longer occupied
async function destroy(req, res, next) {
    const { tableId } = req.params
    const table = await service.read(tableId)
    const reservation = await reservationsService.read(table.reservation_id)

    await service.destroy(tableId)
    const data = await reservationsService.update({ ...reservation, status: "finished"})

    res.status(200).json({ data: data})
}

async function editTable(req, res, next) {
    const editedTable = req.body.data
    console.log(`'editedTable: ${editedTable}'`)
    const tableId = res.locals.table.table_id
    const updatedTable = {
        ...editedTable,
        table_id: tableId
    }
    console.log(updatedTable)
    const data = await service.update(updatedTable)

    res.status(200).json({ data: data})
}

async function deleteTable(req, res, next) {
    const { tableId } = req.params

    await service.deleteTable(tableId)

    res.sendStatus(204)
}


module.exports = {
    list: asyncErrorBoundary(list),
    create: [
        bodyHasData,
        validateBodyHasRequiredProperties,
        validateTableName,
        validateCapacity,
        asyncErrorBoundary(create)
    ],
    read: [
        asyncErrorBoundary(tableExists),
        read
    ],
    update: [
        bodyHasData,
        validateReservationId,
        asyncErrorBoundary(reservationIdExists),
        validateBodyHasRequiredProperties,
        validateOccupiedProperty,
        asyncErrorBoundary(tableExists),
        validateNumberOfPeople,
        validateNotOccupied,
        validateSeatedReservation,
        asyncErrorBoundary(update)
    ],
    delete: [
        asyncErrorBoundary(tableExists),
        asyncErrorBoundary(tableIsOccupied),
        asyncErrorBoundary(destroy)
    ],
    edit: [
        bodyHasData,
        asyncErrorBoundary(tableExists),
        validateTableName,
        validateCapacity,
        asyncErrorBoundary(editTable)
    ],
    deleteTable: [
        asyncErrorBoundary(tableExists),
        asyncErrorBoundary(deleteTable)
    ]
}