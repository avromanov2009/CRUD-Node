const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const check = require('./app/helpers/checkAuth.js'); // Close our API
// app.use(url, check, route)

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// Get config
const config = require('./app/config/application.config.js');

mongoose.connect(config.url, {useNewUrlParser: true})
    .then(() => {
        console.log("Successfully connected to MongoDB.");
    })
    .catch(err => {
        console.log('Could not connect to MongoDB.');
        process.exit();
    });

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


const {userRoutes, loginRoutes} = require('./app/routes/routes');
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    next();
});

app.use('/login', loginRoutes);
app.use('/user', userRoutes);

app.get('/', check, (req, res) => {
    res.send('You are authenticated');
});

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    });
});

var server = app.listen(config.serverPort, function () {
    var host = server.address().address
    var port = server.address().port
    console.log(`Backend listening at http://${host}:${port}`);
});
