// backend/routes/books.js
const express = require('express');
const db      = require('../db');
const authMw  = require('../middleware/auth');
const router  = express.Router();

// semua route di sini butuh token
router.use(authMw);

// GET /books  — hanya buku milik user
router.get('/', async (req,res) => {
  const { rows } = await db.query(
    `SELECT * FROM books WHERE user_id=$1 ORDER BY id`,
    [req.userId]
  );
  res.json(rows);
});

// POST /books
router.post('/', async (req,res) => {
  const { title, author, status } = req.body;
  const { rows } = await db.query(
    `INSERT INTO books (title,author,status,user_id)
     VALUES($1,$2,$3,$4) RETURNING *`,
    [title,author,status,req.userId]
  );
  res.status(201).json(rows[0]);
});

// PUT /books/:id
router.put('/:id', async (req,res) => {
  const { title,author,status } = req.body;
  const { id } = req.params;
  const { rows } = await db.query(
    `UPDATE books
     SET title=$1,author=$2,status=$3
     WHERE id=$4 AND user_id=$5
     RETURNING *`,
    [title,author,status,id,req.userId]
  );
  if (!rows[0]) return res.status(404).json({ error:'Not found'});
  res.json(rows[0]);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  // Delete hanya jika id & user_id cocok
  const { rowCount } = await db.query(
    `DELETE FROM books
     WHERE id=$1 AND user_id=$2`,
    [id, req.userId]
  );

  if (rowCount === 0) {
    // tidak ditemukan buku milik user ini
    return res.status(404).json({ error: 'Book not found or not yours' });
  }

  res.sendStatus(204);
});


module.exports = router;
