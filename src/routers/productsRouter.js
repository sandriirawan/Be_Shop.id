
const express = require('express')
const router = express.Router()
const upload = require('../middlewares/upload')
const productController = require('../controller/products')
const {protect,validateSellerRole} = require('../middlewares/auth')
const {hitCacheProductDetail,clearCacheProductDetail} = require('../middlewares/redis')


  router
  .get('/', protect, productController.getAllProduct)
  .get('/:id', protect, hitCacheProductDetail, productController.getProduct)
  .post('/', protect,validateSellerRole,upload.single('photo'), productController.insertProduct)
  .put('/:id', protect, validateSellerRole,clearCacheProductDetail, upload.single('photo'), productController.updateProduct)
  .delete('/:id', protect, validateSellerRole,clearCacheProductDetail, productController.deleteProduct)

module.exports = router