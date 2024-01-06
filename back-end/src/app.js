const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express")
const logger = require("./config/logger")
const cors = require("cors")

const reservationsRouter = require("./reservations/reservations.router")
const tablesRouter = require("./tables/tables.router")
const errorHandler = require("./errors/errorHandler")
const notFound = require("./errors/notFound")

const app = express()

app.use(logger) // pino-http instance logs useful dev info
app.use(cors()) // Enables cross-origin resource sharing
app.use(express.json()) // Parses request body into json

// Routes
app.use("/reservations", reservationsRouter)
app.use("/tables", tablesRouter)

// Error handling
app.use(notFound)
app.use(errorHandler)

module.exports = app
