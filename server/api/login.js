const express = require('express')
const createUser = require('../controllers/user').createUser

const router = express.Router

router.post('/', (req, res) => {
  const user = req.body
  createUser(user)
})

router.get('/', (req, res) => {
  
})

module.exports = router
