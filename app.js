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
  res.send('This is my about route..... ')
})

// Export the Express API
module.exports = app
