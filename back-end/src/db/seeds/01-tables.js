
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tables').del()
    .then(function () {
      // Inserts seed entries
      return knex('tables').insert([
        {
          "reservation_id": 3,
          "table_name": "#1",
          "capacity": 6,
          "occupied": false,
          "created_at": "2020-12-10T08:31:32.326Z",
          "updated_at": "2020-12-10T08:31:32.326Z"
        },
        {
          "reservation_id": 4,
          "table_name": "#2",
          "capacity": 6,
          "occupied": false,
          "created_at": "2020-12-10T08:31:32.326Z",
          "updated_at": "2020-12-10T08:31:32.326Z"
        },
        {
          "reservation_id": 1,
          "table_name": "Bar #1",
          "capacity": 1,
          "occupied": false,
          "created_at": "2020-12-10T08:30:32.326Z",
          "updated_at": "2020-12-10T08:30:32.326Z"
        },
        {
          "reservation_id": 2,
          "table_name": "Bar #2",
          "capacity": 1,
          "occupied": false,
          "created_at": "2020-12-10T08:31:32.326Z",
          "updated_at": "2020-12-10T08:31:32.326Z"
        },
      ]);
    });
};
