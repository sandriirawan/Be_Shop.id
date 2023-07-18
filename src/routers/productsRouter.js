
const express = require('express')
const router = express.Router()
const upload = require('../middlewares/upload')
const productController = require('../controller/products')
const {protect,validateSellerRole} = require('../middlewares/auth')
const {hitCacheProductDetail,clearCacheProductDetail} = require('../middlewares/redis')


  router
  // .get('/',  productController.getAllProduct)
  // .get('/:id',  hitCacheProductDetail, productController.getProduct)
  // .post('/', protect,validateSellerRole,upload.single('photo'), productController.insertProduct)
  // .put('/:id', protect, validateSellerRole, upload.single('photo'), productController.updateProduct)
  // .delete('/:id', protect, validateSellerRole,clearCacheProductDetail, productController.deleteProduct)

  .get('/',  productController.getAllProduct)
  .get('/:id', productController.getProduct)
  .post('/', upload, productController.insertProduct)
  .put('/:id',  upload, productController.updateProduct)
  .delete('/:id',  productController.deleteProduct)

module.exports = router