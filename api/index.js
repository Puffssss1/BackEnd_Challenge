const express = require('express');
const Moralis = require('moralis').default;
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
});

app.get('/nft/:walletAddress', async (req, res) => {
    const walletAddress = req.params.walletAddress;
    try {
        const response = await Moralis.EvmApi.nft.getWalletNFTs({
            address: walletAddress,
            chain: '0x1',
        });
        console.log(response);
        res.json({
            message: `NFTs owned by ${walletAddress}:`,
            nfts: response.result,
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/balance/:walletAddress', async (req, res) => {
    const walletAddress = req.params.walletAddress;
    try {
        const response = await Moralis.EvmApi.balance.getNativeBalance({
            address: walletAddress,
            chain: '0x1',
        });
        console.log(response);
        res.json({
            message: `Balance for ${walletAddress}:`,
            balance: response.result.balance,
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
