// models/NFT.js
const mongoose = require('mongoose');

// Define the NFT Schema
const nftSchema = new mongoose.Schema({
    nftName: {
        type: String,
        required: true
    },
    nftDescription: {
        type: String,
        required: true
    },
    nftLogoUrl: {
        type: String,
        required: true
    },
    nftId: {
        type: Number,
        unique: true,
        required: true
    },
    userWalletAddress: {
        type: String,
        required: true
    }
});

// Create the NFT model
const NFT = mongoose.model('NFT', nftSchema);

module.exports = NFT;
