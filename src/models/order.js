const Pool = require('../config/db')
const selectAll = ({limit,offset,sort,sortby}) => {
  return Pool.query(`
  SELECT
  order_table.id,
  product.name,
  product.stock,
  product.price,
  product.photo,
  product.description,
  product.category_id,
  order_table.quantity,
  order_table.order_date
FROM
order_table
JOIN
product ON order_table.product_id = product.id
  ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`)
}
const select = (id) => {
  return Pool.query(`SELECT * FROM order_table WHERE id=${id}`)
}
const insert = (data) => {
  const {id,product_id,quantity,order_date} = data
  return Pool.query(`INSERT INTO order_table (id, product_id, quantity, order_date) VALUES (${id}, ${product_id}, ${quantity}, '${order_date}')`)

}
const update = (data) => {
  const {id,product_id,quantity,order_date} = data
  return Pool.query(`UPDATE order_table SET product_id=${product_id}, quantity=${quantity}, order_date='${order_date}'  WHERE id=${id}`)
}
const deleteData = (id) => {
  return Pool.query(`DELETE FROM order_table WHERE id=${id}`)
}

const countData = () =>{
  return Pool.query('SELECT COUNT(*) FROM order_table')
}

const findId =(id)=>{
  return  new Promise ((resolve,reject)=> 
  Pool.query(`SELECT id FROM order_table WHERE id=${id}`,(error,result)=>{
    if(!error){
      resolve(result)
    }else{
      reject(error)
    }
  })
  )
}

module.exports = {
  selectAll,
  select,
  insert,
  update,
  deleteData,
  countData,
  findId
}