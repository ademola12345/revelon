const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');

const mnemonic = 'your mnemonic phrase here'; // Replace with your own mnemonic phrase
const infuraUrl = 'https://rpc.thundercore.com'; // Replace with your own Infura URL
const contractAddress = '0x...'; // Replace with the address of your Thunder Token contract
const privateKey = '0x...'; // Replace with your own private key

const web3 = new Web3(new HDWalletProvider(mnemonic, infuraUrl));
const contract = new web3.eth.Contract(abi, contractAddress);

const sendTokens = async (to, amount) => {
  const tx = {
    from: web3.eth.accounts.wallet[0].address,
    to: contractAddress,
    value: 0,
    data: contract.methods.transfer(to, amount).encodeABI(),
    gas: 3000000,
  };
  const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
  const txHash = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  return txHash;
};

module.exports = (req, res) => {
  const { to, amount } = req.body;
  sendTokens(to, amount)
    .then((txHash) => {
      res.status(200).json({ success: true, txHash });
    })
    .catch((error) => {
      res.status(500).json({ success: false, error: error.message });
    });
};
