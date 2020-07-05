const express = require('express');
const exphbs  = require('express-handlebars');
const path = require('path');
const server = express();

const port = process.env.PORT || 3000;
server.engine('handlebars', exphbs());
server.set('view engine', 'handlebars');

server.set('views', path.join(__dirname, 'views/'));

server.get('/', function (req, res) {
    res.render('home');
});

server.listen(port, () => {
    console.info(`Server started on ${port}`);
});