const bitcore = require('bitcore-lib-dgb');

const createAccount = () => {
  const privateKey = new bitcore.PrivateKey();
  const address = privateKey.toAddress().toString();
  return { privateKey: privateKey.toString(), address };
};

console.log(createAccount());
