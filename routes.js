const express = require('express')
const cors = require('cors'); 
const {  getBidAsk } = require('./db')

const router = express.Router()
router.use(cors( { origin: '*' }));


router.post('/BidAsK', (req, res) => {
  const item = req.body
  console.log(req.body)
  getBidAsk(item)
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
