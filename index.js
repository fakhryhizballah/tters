const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
require('dotenv').config();
const {
    PORT = 8080
} = process.env;

app.use(morgan('dev'));
app.use(express.json());

app.enable('trust proxy');


app.use("/assets/", express.static(path.join(__dirname + "/public/"), {
    // setHeaders: (res, path, stat) => {
    //     res.set('Cache-Control', 'public, max-age=180');
    // }
}));
app.use("/dir/", express.static(path.join("/"), {
    // setHeaders: (res, path, stat) => {
    //     res.set('Cache-Control', 'public, max-age=180');
    // }
}));

const routes = require('./routes');
app.use('/', routes);

app.use(function (err, req, res, next) {
    res.status(500).json({
        status: false,
        message: err.message,
        data: null
    });
});

app.listen(PORT, () => {
    console.log('listening on port', PORT);

});