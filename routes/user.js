const express = require('express')
const router = express.Router()

const User = require('../models/user')

router.post('/users', (req, res) => {
  const newUser = { email, password } = req.body
  const user = new User(newUser)

  user.save().then((user) => {
    res.status(201).send(user)
  })
})

router.get('/users', (req, res) => {
  User.find().then((users) => {
    res.send(users)
  })
})

module.exports = router
