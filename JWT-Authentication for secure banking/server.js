const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Hardcoded user for demo
const users = {
  user1: {
    password: 'password123',
    balance: 1000
  }
};

const SECRET = 'mysecretkey'; // Use a strong secret key in production

// JWT Authentication Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'Invalid or expired token' });

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = user;
    next();
  });
}

// Login Route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!users[username] || users[username].password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// View Balance (Protected)
app.get('/balance', authenticateToken, (req, res) => {
  const user = users[req.user.username];
  res.json({ balance: user.balance });
});

// Deposit Money (Protected)
app.post('/deposit', authenticateToken, (req, res) => {
  const { amount } = req.body;
  if (typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ message: 'Invalid amount' });
  }
  const user = users[req.user.username];
  user.balance += amount;
  res.json({ message: `Deposited $${amount}`, newBalance: user.balance });
});

// Withdraw Money (Protected)
app.post('/withdraw', authenticateToken, (req, res) => {
  const { amount } = req.body;
  if (typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ message: 'Invalid amount' });
  }
  const user = users[req.user.username];
  if (user.balance < amount) {
    return res.status(400).json({ message: 'Insufficient balance' });
  }
  user.balance -= amount;
  res.json({ message: `Withdrew $${amount}`, newBalance: user.balance });
});

// Start Server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});