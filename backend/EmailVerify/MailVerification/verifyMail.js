import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config();

// ✅ Reuse transporter — created once, not on every function call
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
})

// ✅ Inline HTML template — no fs.readFileSync, safe for Vercel serverless
const getHtml = (token, username) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 8px;
            padding: 40px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333333;
        }
        p {
            color: #555555;
            line-height: 1.6;
        }
        .btn {
            display: inline-block;
            margin-top: 20px;
            padding: 12px 24px;
            background-color: #4F46E5;
            color: #ffffff;
            text-decoration: none;
            border-radius: 6px;
            font-size: 16px;
        }
        .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #aaaaaa;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Hi ${username}! 👋</h1>
        <p>Thanks for registering. Please verify your email address by clicking the button below.</p>
        <p>This link will expire in <strong>10 minutes</strong>.</p>
        <a href="${process.env.CLIENT_URL}/verify?token=${token}" class="btn">Verify Email</a>
        <p>If the button doesn't work, copy and paste this link into your browser:</p>
        <p style="word-break: break-all; color: #4F46E5;">
            ${process.env.CLIENT_URL}/verify?token=${token}
        </p>
        <div class="footer">
            <p>If you did not create an account, you can safely ignore this email.</p>
        </div>
    </div>
</body>
</html>
`

export const verifyMail = async (token, email, username) => {
    const mailConfigurations = {
        from: `"No Reply" <${process.env.MAIL_USER}>`,
        to: email,
        subject: 'Email Verification',
        html: getHtml(token, username),
    }

    // ✅ Send ONCE using async/await only — no callback
    const info = await transporter.sendMail(mailConfigurations)
    console.log("Verification email sent:", info.response)
}