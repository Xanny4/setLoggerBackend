const bodyParser = require("body-parser");
const express = require('express');
const setRouter = require("./routes/Set");
const exerciseRouter = require("./routes/Exercise")
const userRouter = require("./routes/User");

const app = express();
app.use(bodyParser.json());
app.use('/api/sets', setRouter);
app.use('/api/exercises', exerciseRouter);
app.use('/api/users', userRouter);

module.exports = app;


