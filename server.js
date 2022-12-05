const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
var { expressjwt: jwt } = require('express-jwt')

process.env.SECRET

// middleware
app.use(express.json())
app.use(morgan('dev'))

// connect to the database
mongoose.connect(
    'mongodb://localhost:27017/rock-the-vote-db',
    () => console.log('Connected to the Database')
)

// routes
app.use('/auth', require('./routes/authRouter.js'))
app.use('/api', jwt({secret: process.env.SECRET, algorithms: ['HS256']}))
app.use('/api/issue', require('./routes/issueRouter.js'))
app.use('/api/comment', require('./routes/commentRouter.js'))

// error handler
app.use((err, req, res, next) => {
    console.log(err)
    if (err.name === "UnauthorizedError") {
        res.status(err.status)
    }
    return res.send({ errMsg: err.message })
})

// server listen
app.listen(9000, () => {
    console.log('Server is running on local port 9000')
})