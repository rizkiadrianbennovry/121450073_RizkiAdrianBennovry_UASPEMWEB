const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRouter  = require('./routes/auth');
const booksRouter = require('./routes/books');

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

app.use('/auth', authRouter);
app.use('/books', booksRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
