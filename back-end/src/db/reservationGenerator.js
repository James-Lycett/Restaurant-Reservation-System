const moment = require("moment")

function randomNameGenerator() {
        const names = [
            {
                first: "Rick",
                last: "Sanchez",
                tel: "510-555-0164",
            },
            {
                first: "Frank",
                last: "Palicky",
                tel: "717-555-4826",
            },
            {
                first: "Bird",
                last: "Person",
                tel: "408-555-0141",
            },
            {
                first: "Tiger",
                last: "Lion",
                tel: "831-555-0140",
            },
            {
                first: "Summer",
                last: "Smith",
                tel: "805-555-8376",
            },
            {
                first: "Sleepy",
                last: "Gary",
                tel: "925-555-0153",
            },
            {
                first: "Cornvelius",
                last: "Daniel",
                tel: "831-555-5172",
            },
            {
                first: "Morty",
                last: "Smith",
                tel: "650-555-5298",
            },
            {
                first: "Squanchy",
                last: "Squanch",
                tel: "831-555-9812",
            },
            {
                first: "Vance",
                last: "Maximus",
                tel: "405-555-1827",
            },
            {
                first: "Shrimbly",
                last: "Pibbles",
                tel: "415-555-2098",
            },
            {
                first: "Zeep",
                last: "Xanflorp",
                tel: "831-555-1981",
            },
            {
                first: "Risotto",
                last: "Groupon",
                tel: "717-555-9586",
            }
        ]

        const randomIndex = Math.floor(Math.random() * names.length)

        return names[randomIndex]
}

function generator(n) {

    // Reservations array pre-loaded with the reservations necessary to pass tests
    let reservations = [
            {
              first_name: "Rick",
              last_name: "Sanchez",
              mobile_number: "202-555-0164",
              reservation_date: "2020-12-31",
              reservation_time: "20:00:00",
              people: 6,
              status: "booked",
              created_at: "2020-12-10T08:30:32.326Z",
              updated_at: "2020-12-10T08:30:32.326Z"
            },
            {
              first_name: "Frank",
              last_name: "Palicky",
              mobile_number: "202-555-0153",
              reservation_date: "2020-12-30",
              reservation_time: "20:00",
              people: 1,
              status: "booked",
              created_at: "2020-12-10T08:31:32.326Z",
              updated_at: "2020-12-10T08:31:32.326Z"
            },
            {
              first_name: "Bird",
              last_name: "Person",
              mobile_number: "808-555-0141",
              reservation_date: "2020-12-30",
              reservation_time: "18:00",
              people: 1,
              status: "booked",
              created_at: "2020-12-10T08:31:32.326Z",
              updated_at: "2020-12-10T08:31:32.326Z"
            },
            {
              first_name: "Tiger",
              last_name: "Lion",
              mobile_number: "808-555-0140",
              reservation_date: "2025-12-30",
              reservation_time: "18:00",
              people: 3,
              status: "booked",
              created_at: "2020-12-10T08:31:32.326Z",
              updated_at: "2020-12-10T08:31:32.326Z"
            },
            {
              first_name: "Anthony",
              last_name: "Charboneau",
              mobile_number: "620-646-8897",
              reservation_date: "2026-12-30",
              reservation_time: "18:00",
              people: 2,
              status: "booked",
              created_at: "2020-12-10T08:31:32.326Z",
              updated_at: "2020-12-10T08:31:32.326Z"
            },
            {
              first_name: "Anthony",
              last_name: "Charboneau",
              mobile_number: "620-646-8897",
              reservation_date: "2020-01-01",
              reservation_time: "18:00",
              people: 2,
              status: "booked",
              created_at: "2020-12-10T08:31:32.326Z",
              updated_at: "2020-12-10T08:31:32.326Z"
            }
    ]
    let currentDate = moment()


    for (let i = 0; i < n; i++) {
        // Randomly select 'name' object from a list to use in generated reservations
        const randomName1 = randomNameGenerator()
        const randomName2 = randomNameGenerator()
        const randomName3 = randomNameGenerator()

        // Used to increment the date by one day
        const tomorrow = moment(currentDate).add(1, 'days')
        const formattedTomorrow = moment(tomorrow).format("YYYY-MM-DD")

        const generatedReservation1 = {
            first_name: randomName1.first,
            last_name: randomName1.last,
            mobile_number: randomName1.tel,
            reservation_date: formattedTomorrow,
            reservation_time: "18:00",
            people: Math.floor(Math.random() * 6),
            status: "booked",
            created_at: "2024-01-07T08:31:32.326Z",
            updated_at: "2024-01-07T08:31:32.326Z"
        }

        const generatedReservation2 = {
            first_name: randomName2.first,
            last_name: randomName2.last,
            mobile_number: randomName2.tel,
            reservation_date: formattedTomorrow,
            reservation_time: "17:45",
            people: Math.floor(Math.random() * 6),
            status: "booked",
            created_at: "2024-01-07T08:31:32.326Z",
            updated_at: "2024-01-07T08:31:32.326Z"
        }

        const generatedReservation3 = {
            first_name: randomName3.first,
            last_name: randomName3.last,
            mobile_number: randomName3.tel,
            reservation_date: formattedTomorrow,
            reservation_time: "19:30",
            people: Math.floor(Math.random() * 6),
            status: "booked",
            created_at: "2024-01-07T08:31:32.326Z",
            updated_at: "2024-01-07T08:31:32.326Z"
        }

        reservations.push(generatedReservation1)
        reservations.push(generatedReservation2)
        reservations.push(generatedReservation3)

        currentDate = tomorrow
    }

    return reservations
}

module.exports = {
    generator,
}