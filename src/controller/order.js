const createError = require('http-errors')
const {selectAll,select,countData,findId,insert,update,deleteData} = require('../models/order')
const commonHelper = require('../helper/common')
const categoryController = {  

  getAllOrder: async(req, res, next) => {
    try{
      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || 100
      const offset = (page - 1) * limit
      const sortby = req.query.sortby || "id"
      const sort = req.query.sort || "ASC"
      const result = await selectAll({limit,offset,sort,sortby})
      const {rows: [count]} = await countData()
      const totalData = parseInt(count.count)
      const totalPage = Math.ceil(totalData/limit)
      const pagination ={     
            currentPage : page,
            limit:limit,
            totalData:totalData,
            totalPage:totalPage
          }
      commonHelper.response(res, result.rows, 200, "get data success",pagination)
    }catch(error){
      console.log(error);
    }
  },
  getOrder: (req, res, next) => {
    const id = Number(req.params.id)
    select(id)
      .then(
        result => commonHelper.response(res, result.rows, 200, "get data success")
      )
      .catch(err => res.send(err)
      )
  },
  insertOrder: async(req, res) => {
    const {product_id,quantity} = req.body
    const {rows: [count]} = await countData()
    const id = Number(count.count)+1;
    const order_date = new Date().toISOString()
    const data = {
      id,
      product_id,
      quantity,
      order_date,
    }
    await insert(data)
    .then((result) =>
    commonHelper.response(res, result.rows, 201, "Create Product Success")
  )
  .catch((err) =>console.log(err ));
  },

  updateOrder: async(req, res,next) => {
    try{
      const id = Number(req.params.id)
      const {product_id,quantity} = req.body
      const order_date = new Date().toISOString()
      const {rowCount} = await findId(id)
      if(!rowCount){
        return next(createError(403,"ID is Not Found"))
      }
      const data ={
        id,
        product_id,
        quantity,
        order_date,
      }
      await update(data)
        .then(
          result => commonHelper.response(res, result.rows, 200, "Order updated")
          )
        }catch(error){
          console.log(error);
      }
  },
  deleteOrder: async(req, res, next) => {
    try{
      const id = Number(req.params.id)
      const {rowCount} = await findId(id)
      if(!rowCount){
        return next(createError(403,"ID is Not Found"))
      }
      deleteData(id)
        .then(
          result => commonHelper.response(res, result.rows, 200, "Order deleted")
        )
        .catch(err => res.send(err)
        )
    }catch(error){
        console.log(error);
    }
  }
}

module.exports = categoryController