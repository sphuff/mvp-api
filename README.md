## Setup
### Sequelize
You'll need to run `npx sequelize-cli db:migrate` and `npx sequelize-cli db:migrate --env test` to create the ApiKeys table.

### Run Locally
First, set up docker, and run DB container with `docker-compose up -d`.
Next, set up stripe and `stripe listen --forward-to http://localhost:3000/billing/webhook`, then `yarn start`