const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const user_routes = require('./api/routes/user')

const database_connection = () => {
    try{
        mongoose.connect('mongodb://127.0.0.1:27017/Node-Chat-App', {
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

const routes = () => {
    app.use('/user', user_routes)
}

database_connection()
middlewares()
routes()
module.exports = app