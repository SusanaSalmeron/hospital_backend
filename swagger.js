const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Hospital',
        description: 'Hospital app'
    },
    host: 'localhost:3001',
    schemes: ['http'],
    definitions: {
        NewAppointment: {
            pickedDate: '21/10/2022',
            doctor: 1
        },
        NewRecord: {
            diagnostics: "covid-20",
            description: "Cold related symptoms"
        },
        Login: {
            email: "ipsum.dolor@ac.ca",
            password: "Password1"
        },
        Register: {
            email: "ipsum.dolor@ac.ca",
            password: "Password1",
            name: "Chadwick Franco",
            address: "693-5132 Lorem. St.",
            postalZip: "51648-71464",
            region: "Limon",
            country: "Indonesia",
            phone: "1-459-323-3148",
            dob: "17-01-1938",
            ssnumber: "7342553NV",
            company: "Augue Id Corporation"
        },
        ModifyPatientData: {
            name: "Chadwick Franco",
            email: "ipsum.dolor@ac.ca",
            address: "Calle Fuencarral 39",
            postalZip: "28004",
            region: "Madrid",
            country: "Spain",
            phone: "+34667438722",
            ssnumber: "7342553NV",
            company: "Augue Id Corporation"
        },
        ContactUsForm: {
            id: 7,
            name: "Peter Smith",
            email: "peters@gmai.com",
            subject: "new date",
            message: "asdfghjklñasdfghjklñasdfghjklñasdfghjklñasdfghjklñ"
        }
    }
}

const outputFile = './swagger.json';
const endpointsFile = ['./apiRoutes.js']
swaggerAutogen(outputFile, endpointsFile, doc)
