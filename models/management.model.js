let contactUsId = 3

const addQueryToDB = async (name, email, subject, message) => {
    const contactUsTable = db.getCollection("contactUs")
    contactUsTable.insert(
        {
            id: contactUsId++,
            name: name,
            email: email,
            subject: subject,
            message: message
        }
    )
}

module.exports = { addQueryToDB }