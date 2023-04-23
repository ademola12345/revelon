const Web3 = require('web3');
const web3 = new Web3('https://testnet-rpc.thundercore.com');

function createAccount() {
  const account = web3.eth.accounts.create();
  return { privateKey: account.privateKey, address: account.address };
}

module.exports = createAccount;
