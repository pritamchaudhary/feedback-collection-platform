const express = require('express');
const Form = require('../models/Form');
const auth = require('../middleware/auth');
const { nanoid } = require('nanoid');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  const { title, questions } = req.body;
  if (!title || !questions || questions.length < 3 || questions.length > 5)
    return res.status(400).json({ message: '3-5 questions required' });
  const form = new Form({
    title,
    questions,
    adminId: req.user.id,
    publicId: nanoid(10)
  });
  await form.save();
  res.json(form);
});

router.get('/:id', auth, async (req, res) => {
  const form = await Form.findOne({ _id: req.params.id, adminId: req.user.id });
  if (!form) return res.status(404).json({ message: 'Form not found' });
  res.json(form);
});

router.get('/public/:publicId', async (req, res) => {
  const form = await Form.findOne({ publicId: req.params.publicId });
  if (!form) return res.status(404).json({ message: 'Form not found' });
  res.json(form);
});

router.get('/', auth, async (req, res) => {
  const forms = await Form.find({ adminId: req.user.id });
  res.json(forms);
});

module.exports = router;