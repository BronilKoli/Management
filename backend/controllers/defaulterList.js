const mongoose = require('mongoose');
const Default = require('../models/Default'); // Assuming Default schema is defined in models/Default.js

// Function to save defaulter list to MongoDB
const saveDefaulterList = async (req, res) => {
    try {
        const defaulterData = req.body;
        const newDefaulter = new Default(defaulterData);
        await newDefaulter.save();
        res.status(201).json({ message: 'Defaulter list saved successfully', data: newDefaulter });
    } catch (error) {
        res.status(500).json({ message: 'Error saving defaulter list', error: error.message });
    }
};

module.exports = { saveDefaulterList };