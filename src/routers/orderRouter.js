const express = require('express')
const router = express.Router()
const {getAllOrder,getOrder,insertOrder,updateOrder,deleteOrder, getOrderByUserId} = require('../controller/order')
const {protect} = require('../middlewares/auth')


router
  .get('/', getAllOrder)
  .get('/users', getOrderByUserId)
  .get('/:id', getOrder)
  .post('/', insertOrder)
  .put('/:id', updateOrder)
  .delete('/:id', deleteOrder)

module.exports = router