const nodemailer = require("nodemailer");
const log = require('npmlog')

let client;

async function initializeEmailClient() {
    const testAccount = await nodemailer.createTestAccount();
    const transporter = await nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });
    return transporter
}

const getEmailClient = async () => {
    if (!client) {
        client = await initializeEmailClient()
    }
    return client
}

async function sendEmail(email) {
    const emailClient = await getEmailClient()
    let info = await emailClient.sendMail({
        from: "emailhhcontactus@gmai.com",
        to: email,
        subject: "No replay",
        text: "We have received your inquiry. Our team will contact you shortly",
        html: "<b>We have received your inquiry. Our team will contact you shortly</b>",
    });

    log.info("Message sent: %s", info.messageId);
    log.info("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = { sendEmail }