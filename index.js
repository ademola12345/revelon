const ethers = require('ethers');
const { VercelRequest, VercelResponse } = require('@vercel/node');

const privateKey = process.env.PRIVATE_KEY; // Replace with your private key
const providerUrl = 'https://rpc.thundercore.com';
const provider = new ethers.providers.JsonRpcProvider(providerUrl);

module.exports = async (req, res) => {
  try {
    const { to, value } = req.query;
    const wallet = new ethers.Wallet(privateKey, provider);
    const tx = {
      to: to,
      value: ethers.utils.parseEther(value),
    };
    const txHash = await wallet.sendTransaction(tx);
    res.status(200).json({ status: 'success', txHash: txHash.hash });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: error.message });
  }
};
