const express = require('express')
const router = express.Router()
const {getAllOrder,getOrder,insertOrder,updateOrder,deleteOrder} = require('../controller/order')
const {protect} = require('../middlewares/auth')


router
  .get('/',protect, getAllOrder)
  .get('/:id',protect, getOrder)
  .post('/', protect,insertOrder)
  .put('/:id',protect, updateOrder)
  .delete('/:id',protect, deleteOrder)

module.exports = router