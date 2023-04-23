const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');

const privateKey = 'e204dc56a40b6f2888206fa0c352ae14dbd232e01792c0c519f3662aef5d3b48'; // Replace with your own private key
const infuraUrl = 'https://rpc.thundercore.com'; // Replace with your own Infura URL
const contractAddress = '0x6e938eFb27744378CE5eB322BCEd228Bb33B505a'; // Replace with the address of your Thunder Token contract

const web3 = new Web3(new HDWalletProvider(privateKey, infuraUrl));
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
