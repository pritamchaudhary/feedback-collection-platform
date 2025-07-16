const express = require('express');
const Response = require('../models/Response');
const Form = require('../models/Form');
const auth = require('../middleware/auth');
const router = express.Router();
const { Parser } = require('json2csv');
const jwt = require('jsonwebtoken');

// Middleware to check token in header or query
function authQueryOrHeader(req, res, next) {
  let token = req.headers['authorization']?.split(' ')[1];
  if (!token && req.query.token) {
    token = req.query.token;
  }
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
}

router.post('/:publicId', async (req, res) => {
  const form = await Form.findOne({ publicId: req.params.publicId });
  if (!form) return res.status(404).json({ message: 'Form not found' });
  const response = new Response({
    formId: form._id,
    answers: req.body.answers
  });
  await response.save();
  res.json({ message: 'Submitted' });
});

router.get('/:formId', auth, async (req, res) => {
  const responses = await Response.find({ formId: req.params.formId });
  res.json(responses);
});

router.get('/:formId/summary', auth, async (req, res) => {
  const responses = await Response.find({ formId: req.params.formId });
  // Basic summary: count per question
  const summary = {};
  responses.forEach(r => {
    r.answers.forEach(a => {
      summary[a.questionId] = summary[a.questionId] || {};
      summary[a.questionId][a.answer] = (summary[a.questionId][a.answer] || 0) + 1;
    });
  });
  res.json(summary);
});

// Export as CSV, accept token in header or query
router.get('/:formId/export', authQueryOrHeader, async (req, res) => {
  const responses = await Response.find({ formId: req.params.formId });
  if (!responses.length) return res.status(404).json({ message: 'No responses' });
  const fields = ['submittedAt', ...responses[0].answers.map((_, i) => `answer${i + 1}`)];
  const data = responses.map(r => {
    const row = { submittedAt: r.submittedAt };
    r.answers.forEach((a, i) => { row[`answer${i + 1}`] = a.answer; });
    return row;
  });
  const parser = new Parser({ fields });
  res.header('Content-Type', 'text/csv');
  res.attachment('responses.csv');
  res.send(parser.parse(data));
});

module.exports = router;