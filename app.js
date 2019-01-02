require('dotenv').config()

const express = require('express')
const helmet = require('helmet')
const mongoose = require('./db/mongoose')
const paginate = require('express-paginate')

const app = express()
const { PORT } = process.env

const userRoutes = require('./routes/user')

app.set('view engine', 'ejs')

app.use(helmet())
// app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(paginate.middleware(10, 50))

app.use(userRoutes)

app.get('/', (req, res) => res.render('index'))

app.use((req, res, next) => {
  res.status(404).send('Sorry, we cannot find that!')
})

app.use((err, req, res, next) => {
  res.status(500).send(err.message)
})

app.listen(PORT)

module.exports = app
