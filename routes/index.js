
const express = require('express')
const router = express.Router()
const products = require('./products')
const auth = require('./auth')

router.use('/auth', auth)
router.use('/products', products)

module.exports = router
