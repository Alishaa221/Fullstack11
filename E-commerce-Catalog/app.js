const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/products');

const app = express();
mongoose.connect('mongodb://localhost:27017/ecommerce'); // No deprecated options

app.use(express.json());
app.use('/products', productRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});