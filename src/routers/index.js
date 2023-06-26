const express = require('express')
const router = express.Router()
const usersRouter = require('./usersRouter')
const ProductRouter = require('./productsRouter')
const CategoryRouter = require('../routers/categoryRouter')
const orderRouter = require('../routers/orderRouter')

router
.use('/users', usersRouter)
.use('/products', ProductRouter)
.use('/category', CategoryRouter)
.use('/order', orderRouter)

module.exports = router