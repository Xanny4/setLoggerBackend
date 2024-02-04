const bodyParser = require("body-parser");
const express = require('express');
const cors = require('cors');
const setRouter = require("./routes/Set");
const exerciseRouter = require("./routes/Exercise");
const userRouter = require("./routes/User");

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const crypto = require('crypto');


require('dotenv').config();


const app = express();

// const store = new MongoDBStore({
//     uri: process.env.MONGODB_URI,
//     collection: 'sessions',
// });

// const generateRandomSecret = () => {
//     return crypto.randomBytes(32).toString('hex');
// };

// app.use(session({
//     secret: generateRandomSecret(),
//     resave: false,
//     saveUninitialized: true,
//     store: store,
//     cookie: {
//         maxAge: 1000 * 60 * 60 * 24, // Set the session cookie expiration time
//     },
// }));

// // Middleware to check if a session exists
// const checkSessionMiddleware = (req, res, next) => {
//     if (req.session.userId) {
//         // Session exists, continue with the request
//         next();
//     } else {
//         // Session doesn't exist, send an error response
//         res.status(401).json({ message: 'Unauthorized' });
//     }
// };

// // Example protected route
// app.get('/api/check-session', checkSessionMiddleware, (req, res) => {
//     // If the middleware allows the request to reach here, the session exists
//     res.json({ sessionExists: true });
// });



app.use(cors());  // Use cors middleware

app.use(bodyParser.json());
app.use('/api/sets', setRouter);
app.use('/api/exercises', exerciseRouter);
app.use('/api/users', userRouter);

module.exports = app;
