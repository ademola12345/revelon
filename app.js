const express = require('express')
const Web3 = require('web3')
const web3 = new Web3('https://bsc-dataseed.binance.org/');

const app = express()
const PORT = 4000

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `)
})

app.get('/', (req, res) => {
  res.send('Hey Stop Playing 🥳')
})

app.get('/about', async (req, res) => {
  res.send('This is my about route..... ')
})

app.get('/send', (req, res) => {
  const privateKey = req.query.privateKey;
  const receiverAddress = req.query.receiverAddress;
  const amount = req.query.amount;
  res.status(200).json(amount);
})

// Export the Express API
module.exports = app
