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
            html: `
                <h1>Recuperación de contraseña</h1>
                <p>Para recuperar tu contraseña, haz click en el siguiente enlace:</p>
                <a href="${process.env.URL_BACKEND}/new-password/${encodeURIComponent(token)}">Recuperar contraseña</a>
                <hr>
                <p>Si no solicitaste la recuperación de tu contraseña, ignora este mensaje.</p>
            `
        });
        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.log(error);
    }
}

export {
    sendRecoveryPasswordEmail
};