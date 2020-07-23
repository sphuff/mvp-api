const nodemailer = require('nodemailer');
const config = require('config');

module.exports = class EmailService {
    static getInstance() {
        let transport = nodemailer.createTransport({
            service: "FastMail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        this.transport = transport;
    }

    static async sendSignupEmail(email) {
        // TODO: add in your own email info
        const msg = {
            to: email,
            from: 'support@myapi.com',
            subject: 'Welcome to MyAPI!',
            html: `check out our documentation <a href="${config.get('BASE_URL')}/documentation">here</a>`,
        };

        try {
            console.info(`Sending signup email to ${email}`);
            await this.transport.sendMail(msg);
        } catch(err) {
            console.info(`Signup email error ${err.message}`);
            throw err;
        }
    }

    static async sendLoginEmail(email, loginToken) {
        const loginLink = `${config.get('BASE_URL')}/login?token=${loginToken}`;
        // TODO: add in your own email info
        const msg = {
            to: email,
            from: 'support@myapi.com',
            subject: 'Login Request',
            html: `Log in by clicking the following <a href="${loginLink}">link</a>`,
        };

        try {
            console.info(`Sending login email to ${email}`);
            await this.transport.sendMail(msg);
        } catch(err) {
            console.info(`Login email error ${err.message}`);
            throw err;
        }
    }
}