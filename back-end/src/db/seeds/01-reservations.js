// function to generate n 'random' reservation objects and return them in an array, in json format
const { generator } = require("../reservationGenerator")
const reservations = generator(500)

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("reservations").del()
    .then(function () {      
      return knex("reservations").insert(reservations);
    });
};
