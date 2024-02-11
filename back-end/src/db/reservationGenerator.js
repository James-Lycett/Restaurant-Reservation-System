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
    let reservations = []
    let currentDate = moment()

    for (let i = 0; i < n; i++) {
        const randomName1 = randomNameGenerator()
        const randomName2 = randomNameGenerator()
        const randomName3 = randomNameGenerator()
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