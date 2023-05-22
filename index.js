const { MongoClient, ServerApiVersion } = require('mongodb')
const fs = require('fs')
const express = require('express')

const client = new MongoClient('mongodb+srv://danchoo14:GpB529gxyFuVAruq@cluster0.1cgp7tx.mongodb.net/?retryWrites=true&w=majority', {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

client.connect()
    .then(() => console.log('Mongo connection success'))
    .catch((err) => console.log(err))

const server = express()
server.use(express.json())

server.get('/categories', async (_, res) => {
    try {
        const categories = await client
            .db('node-marketplace')
            .collection('categories')
            .find()
            .toArray()

        res.json(categories)
    } catch (err) {
        console.log(err)
    }
})

server.get('/products/:id', async (req, res) => {
    const { id } = req.params

    try {
        const products = await client
            .db('node-marketplace')
            .collection('products')
            .find(id === 'all' ? undefined : { category: id })
            .toArray()

        res.json(products)
    } catch (err) {
        console.log(err)
    }
})

server.listen(process.env.POST || 3000)