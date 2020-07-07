require('dotenv').config();
const express = require('express');
const exphbs  = require('express-handlebars');
const path = require('path');
const server = express();
const routes = require('./routes');
const cors = require('cors');
const morgan = require('morgan');

const port = process.env.PORT || 3000;

server.use(cors())
server.engine('handlebars', exphbs());
server.set('view engine', 'handlebars');

server.set('views', path.join(__dirname, 'views/'));

server.use(morgan('dev'));
server.use((req, res, next) => {
    // use raw input for webhook
    if (req.originalUrl === '/billing/webhook') {
        next();
    } else {
        express.json()(req, res, next);
    }
});
server.use('/', routes);

server.listen(port, async () => {
    console.info(`Server started on ${port}`);
});