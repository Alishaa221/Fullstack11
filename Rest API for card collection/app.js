const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let cards = [
  { id: 1, suit: 'Hearts', value: 'Ace' },
  { id: 2, suit: 'Spades', value: 'King' },
  { id: 3, suit: 'Diamonds', value: 'Queen' },
];
let nextId = 4;

// GET /cards - Retrieve all cards
app.get('/cards', (req, res) => {
  // For 200 OK, res.json() is a clean shorthand.
  res.json(cards);
});

// GET /cards/:id - Retrieve a single card by its ID
app.get('/cards/:id', (req, res) => {
  const cardId = parseInt(req.params.id, 10);
  const card = cards.find(c => c.id === cardId);

  if (card) {
    res.json(card); // Shorthand for 200 OK
  } else {
    // For error codes, we still need .status()
    res.status(404).json({ message: 'Card not found' });
  }
});

// POST /cards - Create a new card
app.post('/cards', (req, res) => {
  const { suit, value } = req.body;

  if (!suit || !value) {
    // Need .status() for a 400 Bad Request
    return res.status(400).json({ message: 'Suit and value are required.' });
  }

  const newCard = {
    id: nextId++,
    suit,
    value,
  };

  cards.push(newCard);
  // Need .status() to send a 201 Created code
  res.status(201).json(newCard);
});

// DELETE /cards/:id - Delete a card by its ID
app.delete('/cards/:id', (req, res) => {
  const cardId = parseInt(req.params.id, 10);
  const cardIndex = cards.findIndex(c => c.id === cardId);

  if (cardIndex !== -1) {
    const [deletedCard] = cards.splice(cardIndex, 1);
  
    res.json({
      message: `Card with ID ${cardId} removed.`,
      card: deletedCard,
    });
  } else {
    res.status(404).json({ message: 'Card not found' });
  }
});

app.patch('/cards/:id', (req, res) => {
  const cardId = parseInt(req.params.id, 10);
  const card = cards.find(c => c.id === cardId);
  if (!card) {
    return res.status(404).json({ message: 'Card not found' });
  }
  const { suit, value } = req.body;
  if (suit) card.suit = suit;
  if (value) card.value = value;

  res.json({
    message: `Card with ID ${cardId} updated.`,
    card,
  });
});


app.listen(port, () => {
  console.log(`Card API server listening at http://localhost:${port}`);
});