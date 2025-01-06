import MyAppointments from "../views/MyAppointments/MyAppointments";

export const appointmentsData = [
    {
        id: 1,
        date: "2024-11-05",
        time: 14,
        status: "active",
        user: {
            id: 1,
            name: "Gerard",
            email: "gerard@gmail.com",
            birthdate: "1998-07-03",
            nDni: 67543865,
        },
    },
    {
        id: 2,
        date: "2024-11-06",
        time: 10,
        status: "cancelled",
        user: {
            id: 2,
            name: "Laura",
            email: "laura@example.com",
            birthdate: "1990-03-25",
            nDni: 12345678,
        },
    },
    {
        id: 3,
        date: "2024-11-07",
        time: 16,
        status: "active",
        user: {
            id: 3,
            name: "Carlos",
            email: "carlos@example.com",
            birthdate: "1985-10-12",
            nDni: 98765432,
        },
    },
    {
        id: 4,
        date: "2024-11-08",
        time: 9,
        status: "active",
        user: {
            id: 4,
            name: "Ana",
            email: "ana@example.com",
            birthdate: "1992-05-19",
            nDni: 45612378,
        },
    },
    {
        id: 5,
        date: "2024-11-09",
        time: 11,
        status: "completed",
        user: {
            id: 5,
            name: "Miguel",
            email: "miguel@example.com",
            birthdate: "1980-08-03",
            nDni: 32165498,
        },
    },
    {
        id: 6,
        date: "2024-11-10",
        time: 15,
        status: "cancelled",
        user: {
            id: 6,
            name: "Sofia",
            email: "sofia@example.com",
            birthdate: "2000-02-14",
            nDni: 65478912,
        },
    },
    {
        id: 7,
        date: "2024-11-11",
        time: 13,
        status: "active",
        user: {
            id: 7,
            name: "Daniel",
            email: "daniel@example.com",
            birthdate: "1995-12-21",
            nDni: 78912345,
        },
    },
];

export default appointmentsData;
    
