const express = require('express')

const { getItems, updateItems,getItemsGX } = require('./db')

const router = express.Router()
router.use(cors( { origin: '*' }));
router.patch('/TrongXuong', (req, res) => {
  const item = req.body
  if(item._id){
  updateItems(item._id,item.data)
    .then(() => {
      res.status(200).end()
    })
    .catch((err) => {
      console.log(err)
      res.status(500).end()
    })
  } else {
    res.status(500).end()
    }
})

router.post('/GiaoXe', (req, res) => {
  const item = req.body
  console.log(req.body)
  getItemsGX(item)
    .then((items) => {
      res.json(items)
      res.status(200).end()
    })
    .catch((err) => {
      console.log(err)
      res.status(500).end()
    })
})

router.get('/TrongXuong', (req, res) => {
  getItems()
    .then((items) => {
      res.json(items)
      res.status(200).end()
    })
    .catch((err) => {
      console.log(err)
      res.status(500).end()
    })
})



module.exports = router
