const express = require('express');
const router = express.Router();
const Receiver = require('../Models/receiver');

router.post('/', async (req, res) => {
  try {
    const { receiverName, phone, email, gender, organ, bloodGroup } = req.body;
    const report = req.file ? req.file.path : null;

    const newReceiver = new Receiver({
      receiverName,
      phone,
      email,
      gender,
      organ,
      bloodGroup,
      report,
    });

    await newReceiver.save();
    res.status(201).json(newReceiver);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error adding Receiver', error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const receivers = await Receiver.find();
    res.status(200).json(receivers);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error fetching Receivers', error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const receiver = await Receiver.findByIdAndDelete(req.params.id);
    if (!receiver) {
      return res.status(404).json({ message: 'Receiver not found' });
    }

    res.status(200).json({ message: 'Receiver deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error deleting Receiver', error: err.message });
  }
});

// Add the PATCH route for updating receiver status
router.patch('/:id', async (req, res) => {
  try {
    const receiverId = req.params.id; // Receiver's ID from the URL
    const { status } = req.body;      // Status from the request body

    // Find the receiver by ID in the database
    const receiver = await Receiver.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ message: 'Receiver not found' });
    }

    // Update the receiver's status
    receiver.status = status;

    // Save the updated receiver
    await receiver.save();

    // Return the updated receiver data
    res.status(200).json(receiver);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error updating Receiver status', error: err.message });
  }
});


module.exports = router;