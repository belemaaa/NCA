const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const user_routes = require('./api/routes/user')
const { Server } = require('socket.io')
const server = require('./server')

// database connection
try{
    mongoose.connect('mongodb://localhost:27017/Node-chat-app', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log('Database connected successfully')
} catch(error){
    console.log('Database connection failed')
}

// handle routing
app.use('/user', user_routes)

// set up all middlewares
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors)

// establish socket connection
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
})
io.on("connection", (socket) => {
    console.log(socket.id)
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id)
    })
})
    


module.exports = app