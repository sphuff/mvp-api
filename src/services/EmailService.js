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
            html: 'check out our documentation <a href="https://favoritesapi.com/documentation">here</a>',
        };

        try {
            await sgMail.send(msg);
        } catch(err) {
            throw err;
        }
    }
}