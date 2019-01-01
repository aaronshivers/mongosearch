const express = require('express')
const router = express.Router()

const User = require('../models/user')
const populateDatabase = require('../middleware/populate-database')

router.post('/users', (req, res) => {
  const { email, password } = req.body
  const newUser = { email, password }
  const user = new User(newUser)

  user.save().then((user) => {
    res.status(201).send(user)
  }).catch(err => res.status(400).send(err.message))
})

router.get('/users', (req, res) => {
  User.find().then((users) => {
    res.render('users', { users })
  })
})

router.get('/users/:id/view', (req, res) => {
  const { id } = req.params

  User.findById(id).then((user) => {
    res.render('view', { user })
  })
})

router.get('/users/search', (req, res) => {
  res.render('search')
})

router.post('/users/search', (req, res) => {
  const { query } = req.body

  User.find( { $text: { $search: query } } ).then((users) => {
    if (!users) return res.status(404).send(`Sorry, we couldn't find that.`)

    res.render('results', { users })
  }).catch(err => res.status(500).send(err.message))
})

router.get('/users/populate', (req, res) => {
  populateDatabase()

  setTimeout(() => res.redirect('/users'), 5000)
})

module.exports = router
