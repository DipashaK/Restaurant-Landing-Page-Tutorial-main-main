// const express = require('express');
// const router = express.Router();
// const Donation = require('../Models/donation');

// router.post('/', async (req, res) => {
//   try {
//     const { donorName, phone, email, gender, organ, bloodGroup } = req.body;

//     const newDonation = new Donation({
//       donorName,
//       phone,
//       email,
//       gender,
//       organ,
//       bloodGroup
//     });

//     await newDonation.save();
//     res.status(201).json(newDonation);
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({ message: 'Error adding donation', error: err.message });
//   }
// });

// router.get('/api/donor', async (req, res) => {
//   const email = req.query.email; // Get the email from the query parameter
//   const donors = await Donor.find({ email });
//   res.json(donors);
// });

// router.get('/', authenticate, async (req, res) => {
//   try {
//     const donations = await Donation.find({ userId: req.user.userId }); // Only fetch donations for the logged-in user
//     res.json(donations); // Send donations data to the client
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });


// router.get('/', async (req, res) => {
//   try {
//     const donations = await Donation.find();
//     res.status(200).json(donations);
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({ message: 'Error fetching donations', error: err.message });
//   }
// });

// router.delete('/:id', async (req, res) => {
//   try {
//     const donation = await Donation.findByIdAndDelete(req.params.id);
//     if (!donation) {
//       return res.status(404).json({ message: 'Donation not found' });
//     }

//     res.status(200).json({ message: 'Donation deleted successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({ message: 'Error deleting donation', error: err.message });
//   }
// });

// router.put('/:id', async (req, res) => {
//   try {
//     const updatedData = req.body;

//     const donation = await Donation.findByIdAndUpdate(req.params.id, updatedData, { new: true });
//     if (!donation) {
//       return res.status(404).json({ message: 'Donation not found' });
//     }

//     res.status(200).json(donation);
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({ message: 'Error updating donation', error: err.message });
//   }
// });


// // In your donor routes (donor.js)
// router.put('/match/:donorId', async (req, res) => {
//   const { receiverId } = req.body;

//   try {
//     // Update donor status (and receiver if needed)
//     const donor = await Donor.findByIdAndUpdate(req.params.donorId, { matchedWith: receiverId }, { new: true });
//     const receiver = await Receiver.findByIdAndUpdate(receiverId, { matchedWith: req.params.donorId }, { new: true });

//     res.json({ donor, receiver });
//   } catch (error) {
//     res.status(500).json({ message: "Error matching donor and receiver." });
//   }
// });


// module.exports = router;














// const express = require('express');
// const router = express.Router();
// const Donation = require('../Models/donation');
// const { authenticate } = require('../Middleware/authenticate'); // Assuming authenticate middleware is in a separate file

// // POST: Add new donation
// router.post('/', async (req, res) => {
//   try {
//     const { donorName, phone, email, gender, organ, bloodGroup, userId } = req.body; // Assuming userId is passed from the frontend

//     const newDonation = new Donation({
//       donorName,
//       phone,
//       email,
//       gender,
//       organ,
//       bloodGroup,
//       userId, // Save userId with donation to associate with the user
//     });

//     await newDonation.save();
//     res.status(201).json(newDonation);
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({ message: 'Error adding donation', error: err.message });
//   }
// });

// // GET: Fetch donations for the logged-in user
// router.get('/', authenticate, async (req, res) => {
//   try {
//     // Fetch donations for the logged-in user only
//     const donations = await Donation.find({ userId: req.user.userId }); // Use userId from JWT token
//     res.json(donations);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // GET: Fetch donations for a specific email (This seems redundant if using JWT-based filtering, but keeping it for now)
// router.get('/api/donor', async (req, res) => {
//   const email = req.query.email;

//   try {
//     if (!email) {
//       return res.status(400).json({ message: 'Email is required' });
//     }

//     const donors = await Donor.find({ email: email }); // Fetch donors for the logged-in user
//     res.json(donors);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching donors' });
//   }
// });


// // DELETE: Delete donation by ID
// router.delete('/:id', authenticate, async (req, res) => {
//   try {
//     const donation = await Donation.findByIdAndDelete(req.params.id);
//     if (!donation) {
//       return res.status(404).json({ message: 'Donation not found' });
//     }

//     res.status(200).json({ message: 'Donation deleted successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({ message: 'Error deleting donation', error: err.message });
//   }
// });

// // PUT: Update donation by ID
// router.put('/:id', authenticate, async (req, res) => {
//   try {
//     const updatedData = req.body;

//     const donation = await Donation.findByIdAndUpdate(req.params.id, updatedData, { new: true });
//     if (!donation) {
//       return res.status(404).json({ message: 'Donation not found' });
//     }

//     res.status(200).json(donation);
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({ message: 'Error updating donation', error: err.message });
//   }
// });

// // PUT: Match donor with receiver (assuming matching logic)
// router.put('/match/:donorId', async (req, res) => {
//   const { receiverId } = req.body;

//   try {
//     // Update donor status and receiver if needed
//     const donor = await Donation.findByIdAndUpdate(req.params.donorId, { matchedWith: receiverId }, { new: true });

//     res.json({ donor });
//   } catch (error) {
//     res.status(500).json({ message: "Error matching donor." });
//   }
// });

// module.exports = router;















const express = require('express');
const router = express.Router();
const Donation = require('../Models/donation');
const { authenticate } = require('../Middleware/authenticate'); // Assuming authenticate middleware is in a separate file

// POST: Add new donation
router.post('/', authenticate, async (req, res) => {
  try {
    const { donorName, phone, email, gender, organ, bloodGroup } = req.body;
    const userId = req.user.userId;  // Get userId from the authenticated user

    const newDonation = new Donation({
      donorName,
      phone,
      email,
      gender,
      organ,
      bloodGroup,
      userId, // Save userId with donation to associate with the user
    });

    await newDonation.save();
    res.status(201).json(newDonation);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error adding donation', error: err.message });
  }
});

// GET: Fetch donations for the logged-in user
router.get('/', authenticate, async (req, res) => {
  try {
    // Fetch donations for the logged-in user using the userId from the JWT token
    const donations = await Donation.find({ userId: req.user.userId }); // Use the userId from the decoded token
    res.json(donations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


// GET: Fetch donations for the logged-in user
router.get('/', authenticate, async (req, res) => {
  try {
    const donations = await Donation.find({ userId: req.user.userId }); // Use userId from JWT token
    res.json(donations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// DELETE: Delete donation by ID
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    
    // Ensure that the donation belongs to the authenticated user
    if (!donation || donation.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized to delete this donation' });
    }

    await donation.remove();
    res.status(200).json({ message: 'Donation deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error deleting donation', error: err.message });
  }
});

// PUT: Update donation by ID
router.put('/:id', authenticate, async (req, res) => {
  try {
    const updatedData = req.body;
    const donation = await Donation.findById(req.params.id);
    
    // Ensure that the donation belongs to the authenticated user
    if (!donation || donation.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized to update this donation' });
    }

    const updatedDonation = await Donation.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.status(200).json(updatedDonation);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error updating donation', error: err.message });
  }
});

// PUT: Match donor with receiver (assuming matching logic)
router.put('/match/:donorId', authenticate, async (req, res) => {
  const { receiverId } = req.body;

  try {
    const donor = await Donation.findByIdAndUpdate(req.params.donorId, { matchedWith: receiverId }, { new: true });
    res.json({ donor });
  } catch (error) {
    res.status(500).json({ message: "Error matching donor." });
  }
});

module.exports = router;