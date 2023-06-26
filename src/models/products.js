const Pool = require('../config/db')

const selectAll = ({limit,offset,sort,sortby}) => {
  return Pool.query(`
  SELECT
  product.id,
  product.name,
  product.stock,
  product.price,
  product.photo,
  product.description,
  category.name as category
FROM
  product
JOIN
  category ON product.category_id = category.id
  ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`)
}
const select = (id) => {
  return Pool.query(`SELECT * FROM product WHERE id=${id}`)
}
const insert = (data) => {
  const { id,name,stock,price,photo,description,category_id } = data
  return Pool.query(`INSERT INTO product (id,name,stock,price,photo,description,category_id) VALUES(${id},'${name}',${stock},${price},'${photo}','${description}', ${category_id})`)
}
const update = (data) => {
  const { id,name,stock,price,photo,description,category_id } = data
  return Pool.query(`UPDATE product SET name='${name}', stock=${stock}, price=${price} ,photo='${photo}' ,description='${description}', category_id=${category_id} WHERE id='${id}'`)
}
const deleteData = (id) => {
  return Pool.query(`DELETE FROM product WHERE id=${id}`)
}

const countData = () =>{
  return Pool.query('SELECT COUNT(*) FROM product')
}

const findId =(id)=>{
  return  new Promise ((resolve,reject)=> 
  Pool.query(`SELECT id FROM product WHERE id=${id}`,(error,result)=>{
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