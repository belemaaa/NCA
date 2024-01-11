const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const user_routes = require('./api/routes/user')

const database_connection = () => {
    try{
        mongoose.connect('mongodb://localhost:27017/Node-chat-app', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Database connected successfully')
    } catch(error){
        console.log('Database connection failed')
    }
}

const middlewares = () => {
    app.use(morgan('dev'))
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())
}

const headers = () => {
    app.use((req, res, next) => {
        // allow cors for all ports/servers
        res.header('Access-Control-Allow-Origin', '*') 
        res.header(
            'Access-Control-Allow-Headers', 
            'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        )
        if (req.method === 'OPTIONS'){
            res.headersSent('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET, PATCH')
            return res.status(200).json({})
        }next()
    })
}
const routes = () => {
    app.use('/user', user_routes)
}

database_connection()
middlewares()
headers()
routes()
module.exports = app