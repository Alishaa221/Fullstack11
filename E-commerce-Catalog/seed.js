const mongoose = require('mongoose');
const Product = require('../models/Product');

mongoose.connect('mongodb://localhost:27017/ecommerce');

const seedProducts = [
    {
        name: "Smartphone",
        price: 699,
        category: "Electronics",
        variants: []
    },
    {
        name: "Running Shoes",
        price: 120,
        category: "Footwear",
        variants: [
            { color: "Red", size: "M", stock: 10 },
            { color: "Blue", size: "L", stock: 5 }
        ]
    },
    {
        name: "Winter Jacket",
        price: 200,
        category: "Apparel",
        variants: [
            { color: "Black", size: "L", stock: 8 },
            { color: "Gray", size: "M", stock: 4 }
        ]
    }
];

async function seedDB() {
    await Product.deleteMany({});
    await Product.insertMany(seedProducts);
    console.log("Database seeded!");
    mongoose.disconnect();
}

seedDB();