const nodemailer = require("nodemailer");
const log = require('npmlog')


async function sendEmail(email) {

    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });

    let info = await transporter.sendMail({
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



