import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


export const sendMail = async (to, subject, text) => {
    const mailOptions = {
        from: 'tu_correo@gmail.com', to,
        subject,
        text,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Correo enviado con éxito');
    } catch (error) {
        console.error('Error enviando correo:', error);
    }
};

export default transporter;