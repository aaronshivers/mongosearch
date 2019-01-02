const express = require('express')
const router = express.Router()
const paginate = require('express-paginate')

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

router.get('/users', async (req, res, next) => {
  
  try {
    const [ results, itemCount ] = await Promise.all([
      User.find({}).limit(req.query.limit).skip(req.skip).lean().exec(),
      User.count({})
    ])

    const pageCount = Math.ceil(itemCount / req.query.limit)

    res.render('users', {
      users: results,
      pageCount,
      itemCount,
      pages: paginate.getArrayPages(req)(4, pageCount, req.query.page)
    })
  } catch (err) {
    next(err)
  }
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

router.get('/users/results', async (req, res, next) => {
  const { query } = req.query

  try {
    const [ results, itemCount ] = await Promise.all([
      User.find( { $text: { $search: query } } ).limit(req.query.limit).skip(req.skip).lean().exec(),
      User.count( { $text: { $search: query } } )
    ])

    // if (!results) return res.status(404).send(`Sorry, we couldn't find that.`)

    const pageCount = Math.ceil(itemCount / req.query.limit)

    res.render('results', {
      users: results,
      pageCount,
      itemCount,
      pages: paginate.getArrayPages(req)(4, pageCount, req.query.page)
    })
  } catch (err) {
    next(err)
  }
})

router.get('/users', async (req, res, next) => {
  
  try {
    const [ results, itemCount ] = await Promise.all([
      User.find({}).limit(req.query.limit).skip(req.skip).lean().exec(),
      User.count({})
    ])

    const pageCount = Math.ceil(itemCount / req.query.limit)

    res.render('users', {
      users: results,
      pageCount,
      itemCount,
      pages: paginate.getArrayPages(req)(10, pageCount, req.query.page)
    })
  } catch (err) {
    next(err)
  }
})

router.get('/users/populate', (req, res) => {
  populateDatabase()

  setTimeout(() => res.redirect('/users'), 5000)
})

module.exports = router
