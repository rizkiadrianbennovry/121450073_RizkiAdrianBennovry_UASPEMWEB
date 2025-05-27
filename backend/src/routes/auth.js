// backend/routes/auth.js
const express = require('express');
const bcrypt  = require('bcrypt');
const jwt     = require('jsonwebtoken');
const db      = require('../db');
require('dotenv').config();

const router = express.Router();

// REGISTER
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  try {
    const { rows } = await db.query(
      `INSERT INTO users (username,password) VALUES ($1,$2) RETURNING id,username`,
      [username, hash]
    );
    res.status(201).json(rows[0]);
  } catch (e) {
    res.status(400).json({ error: 'Username already taken' });
  }
});

// LOGIN
router.post('/login', async (req,res) => {
  const { username, password } = req.body;
  const { rows } = await db.query(`SELECT * FROM users WHERE username=$1`, [username]);
  const user = rows[0];
  if (!user) return res.status(400).json({ error: 'Invalid creds' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ error: 'Invalid creds' });
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '12h' });
  res.json({ token, user: { id: user.id, username: user.username } });
});

module.exports = router;
