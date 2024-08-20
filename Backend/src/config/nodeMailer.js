import nodemailer from "nodemailer"
import dotenv from 'dotenv'
dotenv.config()

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: process.env.HOST_MAILTRAP,
    port: process.env.PORT_MAILTRAP,
    auth: {
        user: process.env.USER_MAILTRAP,
        pass: process.env.PASS_MAILTRAP,
    }
});

const sendRecoveryPasswordEmail = async (email, token) => {
    try {
        let info = await transporter.sendMail({
            from: process.env.USER_MAILTRAP,
            to: email,
            subject: "Recuperación de contraseña",
            text: `Para recuperar tu contraseña, haz clic en el siguiente enlace: http://localhost:3000/recovery-password/${token}`
        });
        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.log(error);
    }
}

export {
    sendRecoveryPasswordEmail
};