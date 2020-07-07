const express = require('express');
const exphbs  = require('express-handlebars');
const path = require('path');
const server = express();
const routes = require('./routes');
const morgan = require('morgan');

const port = process.env.PORT || 3000;
server.engine('handlebars', exphbs());
server.set('view engine', 'handlebars');

server.set('views', path.join(__dirname, 'views/'));

server.use(morgan('dev'));
server.use(express.json());
server.use('/', routes);

server.listen(port, async () => {
    console.info(`Server started on ${port}`);
});