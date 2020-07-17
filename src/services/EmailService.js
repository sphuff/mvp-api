const sgMail = require('@sendgrid/mail');

module.exports = class EmailService {
    static getInstance(database) {
        this.database = database;
    }

    static async sendSignupEmail(email) {
        sgMail.setApiKey(process.env.SENDGRID_KEY);
        const msg = {
            to: email,
            from: 'support@favoritesapi.com',
            subject: 'Welcome to FavoritesAPI!',
            html: `check out our documentation <a href="${process.env.BASE_URL}/documentation">here</a>`,
        };

        try {
            await sgMail.send(msg);
        } catch(err) {
            throw err;
        }
    }

    static async sendLoginEmail(email, loginToken) {
        sgMail.setApiKey(process.env.SENDGRID_KEY);
        const loginLink = `${process.env.BASE_URL}/login?token=${loginToken}`;
        const msg = {
            to: email,
            from: 'support@favoritesapi.com',
            subject: 'Login Request',
            html: `Log in by clicking the following <a href="${loginLink}">link</a>`,
        };

        try {
            await sgMail.send(msg);
        } catch(err) {
            throw err;
        }
    }
}