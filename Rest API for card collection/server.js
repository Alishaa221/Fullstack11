// Import the express library
const express = require('express');

// Create an Express application
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// In-memory array to store card data
let cards = [
  { id: 1, suit: "Hearts", value: "Ace" },
  { id: 2, suit: "Spades", value: "King" },
  { id: 3, suit: "Diamonds", value: "Queen" }
];

let nextId = 4;

//---------------------------
// GET all cards
//---------------------------
app.get('/cards', (req, res) => {
  res.status(200).json(cards);
});

//---------------------------
// GET a single card by ID
//---------------------------
app.get('/cards/:id', (req, res) => {
  const cardId = parseInt(req.params.id);
  const card = cards.find(c => c.id === cardId);

  if (card) {
    res.status(200).json(card);
  } else {
    res.status(404).json({ message: "Card not found" });
  }
});

//---------------------------
// POST a new card
//---------------------------
app.post('/cards', (req, res) => {
  const { suit, value } = req.body;
  if (!suit || !value) {
    return res.status(400).json({ message: "Suit and value are required" });
  }

  const newCard = {
    id: nextId++,
    suit: suit,
    value: value
  };

  cards.push(newCard);
  res.status(201).json(newCard);
});

//---------------------------
// DELETE a card by ID
//---------------------------
app.delete('/cards/:id', (req, res) => {
  const cardId = parseInt(req.params.id);
  const initialLength = cards.length;
  cards = cards.filter(c => c.id !== cardId);

  if (cards.length < initialLength) {
    res.status(200).json({ message: `Card with ID ${cardId} removed`, card: { id: cardId } });
  } else {
    res.status(404).json({ message: "Card not found" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});