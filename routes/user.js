const express = require('express')
const router = express.Router()

const User = require('../models/user')

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
    res.send(users)
  })
})

router.post('/users/search', (req, res) => {
  const { query } = req.body

  User.find( { $text: { $search: query } } ).then((user) => {
    console.log(query)
    console.log(user)
    if (!user) return res.status(404).send(`Sorry, we couldn't find that.`)
    
    res.send(user)
  }).catch(err => res.status(500).send(err))

  // User.textSearch('Matt', (err, result) => {
  //   if (err) return res.status(500).send(err)

  //   const inspect = require('util').inspect
  //   console.log(inspect(result, { depth: null }))
  // })
})

// router.post('/users/search', (req, res) => {
//   const { query } = req.body

//   User.textSearch(query, ((err, result) => {
//     if (err) return handleError(err)

//     const inspect = require('util').inspect

//     console.log(inspect(result, { depth: null }))
//     // res.send(result)
//   })
//   // User.textSearch(query).then((err, result) => {
//   //   if (err) return handleError(err)

//   //   const inspect = require('util').inspect

//   //   console.log(inspect(result, { depth: null }))
//   //   // res.send(result)
//   // })
// })

module.exports = router
