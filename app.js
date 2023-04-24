const express = require('express');
const Web3 = require('web3');
const web3 = new Web3('https://bsc-dataseed.binance.org/'); // use the BSC mainnet

const app = express();
const port = 3000;

app.get('/sendTransaction', async (req, res) => {
  const privateKey = req.query.privateKey;
  const receiverAddress = req.query.receiverAddress;
  const amount = req.query.amount;

  const txObject = {
    to: receiverAddress,
    value: web3.utils.toWei(amount, 'ether'),
    gas: 21000,
  };

  const signedTx = await web3.eth.accounts.signTransaction(txObject, privateKey);

  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  res.send(Transaction hash: ${receipt.transactionHash});
});

app.listen(port, () => {
  console.log(Listening at http://localhost:${port});
});
