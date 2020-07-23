# Getting started
First, set up docker and docker-compose on your local machine.

```
docker-compose up -d # pull docker image, and bring up container

npm i # or yarn, if you use that

npm install -g sequelize-cli # install sequelize CLI, which we'll use as our ORM

sequelize db:migrate # run migrations
sequelize db:seed:all # run seed file

sequelize db:migrate --env test # and again for tests
sequelize db:seed:all --env test

psql -h localhost -d my_api_mvp -U username # just check exists (password is "password")

npm run start:dev # or yarn start:dev

```

Now, go ahead and navigate to `http://localhost:3000/landing` and enter your email. If all is well, you should see an error saying `You did not provide an API key.`.

## Setup
### Stripe
First, create a stripe account, and input your keys into the `.env` file. Next, create a test product using the stripe dashboard, and take note of the price ID. You'll need to input this in the `.env` file.

Now, go ahead and set up a local webhook test using the stripe CLI, [as explained here](https://stripe.com/docs/webhooks/test). The webhook secret will also need to be added to the `.env`.

Lastly, remember to change `BASE_URL` in `production.json` so Stripe knows where to redirect to.

### Email
You'll need to configure which email provider you are using in `EmailService.js`. For instance, if you are using Fastmail, you will set `service` to `FastMail`, and configure the necessary username and password in your environment config.

### Run Locally
Run your DB container with `docker-compose up -d`.
Next, set up the stripe webhook for local testing with `stripe listen --forward-to http://localhost:3000/billing/webhook`, then `yarn start:dev`.

### Testing
Q: "Why am I getting a validation error when I run migrations in the test environment"
A: It's some sequelize weirdness. You can go ahead and delete `database_test.sqlite` and remigrate/reseed.