const moment = require("moment")

function randomNameGenerator() {
        const names = [
            {
                first: "Rick",
                last: "Sanchez"
            },
            {
                first: "Frank",
                last: "Palicky"
            },
            {
                first: "Bird",
                last: "Person"
            },
            {
                first: "Tiger",
                last: "Lion"
            },
            {
                first: "Jerry",
                last: "Smith"
            },
            {
                first: "Sleepy",
                last: "Gary"
            },
            {
                first: "Cornvelius",
                last: "Daniel"
            },
        ]

        const randomIndex = Math.floor(Math.random() * names.length)

        return names[randomIndex]
}

function randomPhoneNumberGenerator() {
    const numbers = [
        "202-555-0164",
        "202-555-0153",
        "808-555-0141",
        "808-555-0140",
        "831-555-5172",
        "717-555-4826",
        "805-555-8376",
        "212-555-7482"
    ]

    const randomIndex = Math.floor(Math.random() * numbers.length)

    return numbers[randomIndex]
}

function generator() {
    let reservations = []
    let currentDate = moment()

    for (let i = 0; i < 1000; i++) {
        let randomName = randomNameGenerator()
        let tomorrow = moment(currentDate).add(1, 'days')

        let generatedReservation = {
            first_name: randomName.first,
            last_name: randomName.last,
            mobile_number: randomPhoneNumberGenerator(),
            reservation_date: moment(tomorrow).format("YYYY-MM-DD"),
            reservation_time: "18:00",
            people: Math.floor(Math.random() * 6),
            status: "booked",
            created_at: "2024-01-07T08:31:32.326Z",
            updated_at: "2024-01-07T08:31:32.326Z"
        }

        reservations.push(generatedReservation)
        currentDate = tomorrow
    }

    return JSON.stringify(reservations)
}

module.exports = {
    generator,
}