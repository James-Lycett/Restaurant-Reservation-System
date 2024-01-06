const router = require("express").Router({ mergeParams: true })
const controller = require("./reservations.controller")
const methodNotAllowed = require("../errors/methodNotAllowed")


// Defines the router for reservation resources
router.route("/")
    .get(controller.listByQuery)
    .post(controller.create)
    .all(methodNotAllowed)

router.route("/:reservationId/status")
    .put(controller.updateStatus)
    .all(methodNotAllowed)

router.route("/:reservationId/edit")
    .put(controller.updateReservation)
    .all(methodNotAllowed)

router.route("/:reservationId")
    .get(controller.read)
    .put(controller.updateReservation)
    .all(methodNotAllowed)

module.exports = router
