const service = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const moment = require('../../node_modules/moment-timezone/builds/moment-timezone-with-data')

// CRUDL functions for /reservations routes

// GET requests with a valid query will return all reservations for the given queried property
async function listByQuery(req, res, next) {
    const { date, mobile_number } = req.query

    if (date) {
      const data = await service.list(date)
      res.json({ data }) 

    } 
    else if (mobile_number) {
      const data = await service.search(mobile_number)

      res.json({ data }) 

    } 
    else {
      next({
        status: 400,
        message: `Invalid query. Request must include a date query in the following format: '?date=YYYY-MM-DD' or a mobile number query in the following format: '?mobile_number=xxx-xxx-xxxx'. received: ${mobile_number}`
      })
    }
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
function bodyHasRequiredProperties(req, res, next) {
  const data = req.body.data
  const bodyProperties = Object.keys(data)
  let validBodyProperties = [
    "first_name",
    "last_name",
    "mobile_number",
    "reservation_date",
    "reservation_time",
    "people"
  ]

  if (!validBodyProperties.every((key) => bodyProperties.includes(key))) {
    return next({
      status: 400,
      message: `Request body has invalid properties or is missing required properties. Valid properties are ${validBodyProperties.join(", ")}`
    })
  } else {
    next()
  }
}

// Validates POST request body properties are not empty
function validatePropertiesAreNotEmpty(req, res, next) {
  const { first_name, last_name, mobile_number, reservation_date, reservation_time, people } = req.body.data
  const properties = {
    first_name: first_name,
    last_name: last_name,
    mobile_number: mobile_number,
    reservation_date: reservation_date,
    reservation_time: reservation_time,
    people: people
  }

  for (let property in properties) {
    if (!properties[property]) {
      return next({
        status: 400,
        message: `${property} property of request body data must have a value. Received '${property}: ${properties[property]}'`
      })
    }
  }

  return next()
}

// Validates mobile_number property is a number
function validateMobileNumber(req, res, next) {
  const { mobile_number } = req.body.data

  if (mobile_number.includes("-")) {
    const arrays = mobile_number.split("-")
    if (arrays.length === 3) {
      let singleArray = arrays[0].concat(arrays[1]).concat(arrays[2])
      if (Number.isNaN(Number(singleArray)) || singleArray.length !== 10) {
        return next({
          status: 400,
          message: `Invalid mobile number. Mobile number must have the following format: 555-555-5555. Received: ${mobile_number}`
        })
      }
    }
    return next()
  }

  if (Number.isNaN(Number(mobile_number))) {
    return next({
      status: 400,
      message: `Invalid mobile number. Mobile number must have the following format: 555-555-5555. Received: ${mobile_number}`
    })
  } else {
    return next()
  }
}

// Validates people property is a number
function validatePeople(req, res, next) {
  const { data } = req.body
  if (data.people < 1 || typeof data.people !== "number") {
    return next({
      status: 400,
      message: `people property of request body data must be a number greater than zero. Recieved '${data.people}', which is a ${typeof data.people}`
    })
  } else {
    next()
  }
}

// Same as above 'bodyHasRequiredProperties' but to be called seperately only for updateStatus
function bodyHasStatusProperty(req, res, next) {
  const bodyProperties = Object.keys(req.body.data)
  let validBodyProperties = [
    "status"
  ]

  if (!validBodyProperties.every((key) => bodyProperties.includes(key))) {
    return next({
      status: 400,
      message: `Request body has invalid properties or is missing required properties. Valid properties are ${validBodyProperties}`
    })
  } else {
    next()
  }
}

// Validates that request status is "booked", never "seated" or "finished"
function validateRequestStatus(req, res, next) {
  const { data } = req.body
  const { status } = data

  // Only validate status if request has status property
  if (!Object.keys(data).includes("status")) {
    return next()
  }

  if (status !== "booked") {
    return next({
      status: 400,
      message: `Request status cannot be 'seated' or 'finished'`
    })
  } else {
    next()
  }
}

// Validates reservation date is in proper format
function validateDateFormat(req, res, next) {
  const { reservation_date } = req.body.data
  const validDate = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/

  if (!validDate.test(reservation_date)) {
    return next({
      status: 400,
      message: `reservation_date must be in the following format: YYYY-MM-DD. Date received: ${reservation_date}`
    })
  } else {
    next()
  }
}

// Validates reservation date is a future date and not on a Tuesday
// Also formats date and time input from frontend into a single Date object, which is easier to operate on for validations
async function validateFutureDate(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data
  const newReservationDate =  moment.tz((reservation_date + " " + reservation_time), "America/Los_Angeles")
  const dateNow = moment.utc()

  res.locals.newReservationDate = newReservationDate

  if (newReservationDate.utc().isSameOrBefore(dateNow)) {
    return next({
      status: 400,
      message: `reservation_date must be in the future. Date received: ${reservation_date}. Time received: ${reservation_time}.`
    })
  } else {
    next()
  }
}

function notTuesday(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data
  const newReservationDate =  new Date(reservation_date + "T" + reservation_time)

  if (newReservationDate.getDay() === 2) {
    return next({
      status: 400,
      message: `Reservation cannot be on a Tuesday. The restaurant is closed on Tuesdays. Date received: ${newReservationDate}`
    })
  } else {
    next()
  }
}

// Validates reservation time is between 10:30am and 9:30pm
function validateTime(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data
  const isValidTime = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(reservation_time)
  if (!isValidTime) {
    return next({
      status: 400,
      message: `reservation_time must be a time. Received: '${reservation_time}'`
    })
  }
  const newReservationDate =  new Date(reservation_date + "T" + reservation_time)
  const hour = newReservationDate.getHours()
  const minute = newReservationDate.getMinutes()

  if (hour < 10 || (hour < 11 && minute < 30) || hour > 21 || (hour > 20 && minute > 30)) {
    return next({
      status: 400,
      message: `Reservation time must be between 10:30am and 9:30pm. Time received: ${reservation_time}`
    })
  } else {
    next()
  }
}

// POST requests will create a new reservation and return the created reservation
async function create(req, res, next) {
  const requestReservation = req.body.data
  const newReservation = {
    ...requestReservation,
    status: "booked"
  }

  const data = await service.create(newReservation)

  res.status(201).json({ data })
}

// Validates that a reservation with the given reservationId exists
async function reservationExists(req, res, next) {
  const { reservationId } = req.params
  const data = await service.read(reservationId)

  if (!data) {
    return next({
      status: 404,
      message: `Reservation with reservation_id "${reservationId}" does not exist`
    })
  } else {
    res.locals.reservation = data
    next()
  }
}

// GET requests with reservationId param will return a single reservation with the given id
async function read(req, res, next) {
  const data = res.locals.reservation

  res.json({ data })
}

// Validates PUT request status property
function validateStatus(req, res, next) {
  const { status } = req.body.data
  const validStatusValues = [
    "booked",
    "seated",
    "finished",
    "cancelled"
  ]

  if (!validStatusValues.some((value) => value === status)) {
    return next({
      status: 400,
      message: `Invalid reservation status value. Valid status values: ${validStatusValues} - Received: '${status}'`
    })
  } else {
    next()
  }
}

// PUT requests to /reservations/:reservationId/status will update the reservation's status property
async function updateStatus(req, res, next) {
  const existingReservation = res.locals.reservation
  const newStatus = req.body.data.status
  const updatedReservation = {
    ...existingReservation,
    status: newStatus
  }
  const data = await service.update(updatedReservation)

  res.json({ data })
}

// Validates for /reservations/:reservationId/edit only reservations with a status of "booked" can be edited
function validateBookedStatus(req, res, next) {
  const { status } = res.locals.reservation

  if (status !== "booked") {
    return next({
      status: 400,
      message: `Only reservations with a status of 'booked' can be edited. Reservation status: '${status}'`
    })
  } else {
    next()
  }
}

// PUT requests to /reservations/:reservationId/edit will update the reservation
async function updateReservation(req, res, next) {
  const updatedReservation = req.body.data
  const data = await service.update(updatedReservation)

  res.json({ data })
}

module.exports = {
  listByQuery: asyncErrorBoundary(listByQuery),
  create: [ 
    bodyHasData,
    bodyHasRequiredProperties,
    validatePropertiesAreNotEmpty,
    validateMobileNumber,
    validatePeople,
    validateDateFormat,
    validateFutureDate,
    notTuesday,
    validateTime,
    validateRequestStatus,
    asyncErrorBoundary(create)
  ],
  read: [
    asyncErrorBoundary(reservationExists),
    read
  ],
  updateStatus: [
    bodyHasStatusProperty,
    validateStatus,
    asyncErrorBoundary(reservationExists),
    validateBookedStatus,
    asyncErrorBoundary(updateStatus)
  ], 
  updateReservation: [
    asyncErrorBoundary(reservationExists),
    bodyHasRequiredProperties,
    validatePropertiesAreNotEmpty,
    validateMobileNumber,
    validateDateFormat,
    validateFutureDate,
    notTuesday,
    validateTime,
    validatePeople,
    validateBookedStatus,
    asyncErrorBoundary(updateReservation)
  ]
}