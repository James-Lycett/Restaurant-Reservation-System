const router = require("express").Router({ mergeParams: true })
const controller = require("./tables.controller")
const methodNotAllowed = require("../errors/methodNotAllowed")


// Defines the router for table resources
router.route("/")
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed)

router.route("/:tableId/edit")
    .put(controller.edit)
    .delete(controller.deleteTable)
    .all(methodNotAllowed)

router.route("/:tableId/seat")
    .put(controller.update)
    .delete(controller.delete)
    .all(methodNotAllowed)

router.route("/:tableId")
    .get(controller.read)
    .all(methodNotAllowed)


module.exports = router