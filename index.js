const { MongoClient, ServerApiVersion } = require('mongodb')
const fs = require('fs')
const express = require('express')

const client = new MongoClient('mongodb+srv://danchoo14:bu3oYdOFLqbn7lVU@chat-bot.u2hsxra.mongodb.net/?retryWrites=true&w=majority', {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

client.connect()
    .then(() => console.log('Mongo connection success'))
    .catch(() => console.log('Mongo connection error'))

const server = express()
server.use(express.json())



server.listen(3000)