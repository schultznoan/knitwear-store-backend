const { MongoClient, ServerApiVersion } = require('mongodb')
const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')

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
server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

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

server.post('/checkout', async (req, res) => {
    try {
        await client
            .db('node-marketplace')
            .collection('orders')
            .insertOne(req.body)
        res.send('Успешно!')
    } catch (err) {
        console.error(err)
    }
})

server.listen(process.env.PORT || 3000)