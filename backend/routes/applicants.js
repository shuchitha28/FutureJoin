const express = require('express');
const router = express.Router();

const Applicant = require('../models/Applicant');
function checkAdminKey(req, res, next) {
  const adminKey = req.headers.authorization?.split(' ')[1];
  if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized: invalid admin key' });
  }
  next();
}

router.post('/', async (req, res) => {
    try {
        const { name, email, phone, role, resumeLink, message } = req.body;
        if (!name || !email || !role) return res.status(400).json({ error:'name, email and role are required' });
        const applicant = new Applicant({ name, email, phone, role, resumeLink,message });
        await applicant.save();
        res.status(201).json({ message: 'Applicant created', applicant });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});
router.get('/', async (req, res) => {
    try {
        const adminKey = req.header('x-admin-key');
        if (!adminKey || adminKey !== process.env.ADMIN_KEY) return res.status(401).json({ error: 'Unauthorized' });
        const applicants = await Applicant.find().sort({ createdAt: -1 });
        res.json({ applicants });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});
router.delete('/:id', checkAdminKey, async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Applicant.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Applicant not found' });
    }
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});
module.exports = router;
