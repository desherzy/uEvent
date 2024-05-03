const nodemailer = require('nodemailer')

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }


    async sendActivationLink(link, to) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Confirm registration',
            text: '',
            html:
                `
                <div style="background-color: #112535; padding: 20px; border-radius: 12px; margin: 0 auto; text-align: center;">
                        <h1 style="text-align: center; color: white;">Uevent/</h1>
                        <br>
                        <h2 style="color: white;">Thanks for signing up! You must follow this link to activate your account</h2> <br>
                        <p style="text-align: center;">
                        <a href="${link}" style="text-decoration: none;">${link}</a>
                    </p>
                        <br>
                </div>
                `
        })
    }

    async sendResetLink(link, to) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Confirm registration',
            text: '',
            html:
                `
                <div style="background-color: #2CAAD8; padding: 20px; border-radius: 12px; margin: 0 auto; text-align: center;">
                        <h1 style="text-align: center; color: white;">Uevent</h1>
                        <br>
                        <h2 style="color: white;">Dear user, here is your reset-password link,</h2> <br>
                        <p style="text-align: center;">
                        <a href="${link}" style="text-decoration: none;">${link}</a>
                    </p>
                        <br>
                </div>
                `
        })
    }

    async sendNotification(to, event) {
        const startTime = new Date(event.start_time);
        const endTime = new Date(event.end_time);

        const startHour = startTime.getHours().toString().padStart(2, '0');
        const startMinute = startTime.getMinutes().toString().padStart(2, '0');
        const endHour = endTime.getHours().toString().padStart(2, '0');
        const endMinute = endTime.getMinutes().toString().padStart(2, '0');

        const eventColor = event.color || '#2CAAD8';

        const htmlContent = `
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 12px; margin: 0 auto; max-width: 600px;">
                <div style="background-color: #38a169; height: 50px; border-radius: 6px; width: 100%; margin-bottom: 20px;"></div>
                <h1 style="font-size: 2rem; color: #333; text-align: center;">Uevent</h1>
                <br>
                <h2 style="color: #333;">Dear user,</h2>
                <h3 style="color: #333;">You have an upcoming event today:</h3>
                <h4 style="color: #666;">Conference</h4>
                <h3 style="color: #333;">${event.name}</h3>
                <p style="color: #666;">${event.description}</p>
                <p style="color: #666;">Start time: ${startHour}:${startMinute}</p>
                <p style="color: #666;">End time: ${endHour}:${endMinute}</p>
                <br>
                <p style="text-align: center;">
                <a href="http://localhost:5173/events" style="text-decoration: none; background-color: #38a169; color: white; padding: 10px 20px; border-radius: 6px; font-size: 1.2rem;">View Event</a>
                </p>
                <br>
            </div>
        `;

        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Upcoming Event Notification',
            text: '',
            html: htmlContent
        });
    }


}

module.exports = new MailService();