var express = require('express');
var bodyParser = require('body-parser')
var nedb = require('nedb');
var expressNedbRest = require('express-nedb-rest');

// setup express app
var oApp = express();

oApp.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// parse application/x-www-form-urlencoded 
oApp.use(bodyParser.urlencoded({ extended: false }))
// parse application/json 
oApp.use(bodyParser.json())

// create  NEDB datastore
var datastore = new nedb({ filename: "db/mock.db",  autoload: true });

// create rest api router and connect it to datastore  
var restApi = expressNedbRest();
restApi.addDatastore('mock', datastore);

// setup express server to serve rest service
oApp.use('/', restApi);

oApp.listen(9901, function () {
    console.log('you may use nedb rest api at port 9901');
});

