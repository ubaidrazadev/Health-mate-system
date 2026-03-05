import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import handlebars from 'handlebars'

dotenv.config();

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const verifyMail = async (token, email, username) => {

    const emailTemplateSource = fs.readFileSync(
        path.join(__dirname, 'template.hbs'),
        'utf-8'
    )

    const template = handlebars.compile(emailTemplateSource)
    const htmlToSend = template({
        token: token,
        username: username
    })

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    const mailConfigurations = {
        from: process.env.MAIL_USER,
        to: email,
        subject: 'Email Verification',
        html: htmlToSend,
    };

    await transporter.sendMail(mailConfigurations, function (error, info) {
        if (error) {
            throw new Error(error)
        }
    })

    const info = await transporter.sendMail(mailConfigurations);
    console.log("Email sent:", info.response);
}