const express = require('express');
const router = express.Router();
const AuthorizationRequest = require('../models/AuthorizationRequest');

// Get all authorization requests
router.get('/', async (req, res) => {
  try {
    const requests = await AuthorizationRequest.find().populate('patientId');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new authorization request
router.post('/', async (req, res) => {
  const request = new AuthorizationRequest(req.body);
  try {
    const newRequest = await request.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;