import nodemailer from 'nodemailer';
import mailgen from 'mailgen';

import dotenv from 'dotenv';
dotenv.config();

let mailConfig = {//config for mailer
    // host: "smtp.gmail.com",
    // port: 587,
    // secure: false, // Use `true` for port 465, `false` for all other ports
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,

    },
}

let transporter = nodemailer.createTransport(mailConfig);
transporter.verify(function (error, success) {

    if (error) {
        console.log(error);
    } else {
        console.log('Connected to email server');
    }
});

let mailGenerator = new mailgen({
    theme: "default",
    product: {
        name: "Verify your email address to sigup your account",
        link: "https://mailgen.js/",
    }
})

export const sendOTPByEmail = async (email, username, OTP) => {
    // Body of the email
    var mail = {
        body: {
            name: username,
            intro: `Your OTP for registration is: <strong>${OTP}</strong>`,
            outro: "<strong>Your OTP have expiry time is 1 minutes. Please verify your OTP within 1 minutes.</strong>"
        }
    }

    var emailBody = mailGenerator.generate(mail);

    let message = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Verify OTP for your email",
        html: emailBody,
    }

    try {
        await transporter.sendMail(message);
        console.log("OTP email sent successfully.");
    } catch (error) {
        console.log("Error sending OTP email:", error);
        throw error; // Rethrow the error to handle it in the caller function
    }
}
