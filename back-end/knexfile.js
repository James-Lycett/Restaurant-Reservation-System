/**
 * Knex configuration file.
 *
 * You will not need to make changes to this file.
 */

require('dotenv').config();
const path = require("path");

const {
  DATABASE_URL = "postgresql://postgres@localhost/postgres",
  DEBUG,
} = process.env;

module.exports = {
  development: {
    client: "pg",
    pool: { min: 1, max: 5 },
    connection: {
        connectionString: DATABASE_URL,
        ssl: true
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  test: {
    client: "pg",
    pool: { min: 1, max: 5 },
    connection: {
        connectionString: DATABASE_URL,
        ssl: true
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  preview: {
    client: "pg",
    pool: { min: 1, max: 5 },
    connection: {
        connectionString: DATABASE_URL,
        ssl: true
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  production: {
    client: "pg",
    pool: { min: 1, max: 5 },
    connection: {
        connectionString: DATABASE_URL,
        ssl: true
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
};
