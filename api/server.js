const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
//const usersRouter = require('./users/users-router')
const restrict = require('./middleware/restricted.js');
const dotenv = require('dotenv')
const authRouter = require('./auth/auth-router.js');
const jokesRouter = require('./jokes/jokes-router.js');

const server = express();
dotenv.config()
server.use(helmet());
server.use(cors());
server.use(express.json());

//server.use('/api/users', usersRouter)
server.use('/api/auth', authRouter);
server.use('/api/jokes', restrict, jokesRouter); // only logged-in users should have access!

server.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message, 
        stack: err.stack,
    })
})

module.exports = server;
