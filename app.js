const express = require('express')
const app = express()
const mongoose = require('mongoose')

const db = () => {
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