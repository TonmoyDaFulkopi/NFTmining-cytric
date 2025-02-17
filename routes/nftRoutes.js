// routes/nftRoutes.js
const express = require('express');
const NFT = require('../models/NFT');

const router = express.Router();

// Store NFT Data
router.post('/store', async (req, res) => {
    const { nftName, nftDescription, nftLogoUrl, nftId, userWalletAddress } = req.body;

    try {
        // Check if NFT ID already exists
        const existingNFT = await NFT.findOne({ nftId });
        if (existingNFT) {
            return res.status(400).json({ message: 'NFT ID already exists' });
        }

        // Create a new NFT record
        const newNFT = new NFT({
            nftName,
            nftDescription,
            nftLogoUrl,
            nftId,
            userWalletAddress
        });

        // Save the new NFT to the database
        await newNFT.save();
        res.status(201).json({ message: 'NFT data stored successfully', nft: newNFT });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error storing NFT data' });
    }
});

// Get NFT Data By ID
router.get('/get/:nftId', async (req, res) => {
    const { nftId } = req.params;

    try {
        // Find the NFT by ID
        const nft = await NFT.findOne({ nftId });

        if (!nft) {
            return res.status(404).json({ message: 'NFT not found' });
        }

        res.status(200).json({ nft });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving NFT data' });
    }
});

// Get NFT Gallery By User Wallet Address
router.get('/gallery/:userWalletAddress', async (req, res) => {
    const { userWalletAddress } = req.params;

    try {
        // Find all NFTs created by the specified user wallet address
        const nftGallery = await NFT.find({ userWalletAddress });

        if (nftGallery.length === 0) {
            return res.status(404).json({ message: 'No NFTs found for this user' });
        }

        res.status(200).json({ nftGallery });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving NFT gallery' });
    }
});

module.exports = router;
