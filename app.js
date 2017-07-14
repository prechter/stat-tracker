const express = require('express');
const passport = require('passport');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Activity = require('./models/activities');
const Stat = require('./models/stats');
const User = require('./models/users');
const routes = require('./routes');


app.use(bodyParser.json());
app.use(routes);

app.listen(3000);
console.log('Running on port 3000');
