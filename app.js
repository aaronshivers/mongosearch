require('dotenv').config()

const express = require('express')
const helmet = require('helmet')
const mongoose = require('./db/mongoose')

const app = express()
const { PORT } = process.env

const userRoutes = require('./routes/user')

app.use(helmet())
app.use(express.json())

app.use(userRoutes)

app.get('/', (req, res) => res.send('Welcome to the Mongo Search App'))

app.use((req, res, next) => {
  res.status(404).send('Sorry, we cannot find that!')
})

app.use((err, req, res, next) => {
  res.status(500).send(err.message)
})





app.listen(PORT)

module.exports = app
