# Product CRUD Application

This is a simple Node.js application that implements basic Create, Read, Update, and Delete (CRUD) operations for a product database using Mongoose.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Alishaa221/Fullstack11.git
   ```
2. Navigate to the project directory:
   ```
   cd product-crud-app
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the root directory and add your MongoDB connection string:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

## Usage

To start the application, run the following command:
```
npm start
```
The server will start on `http://localhost:3000`.

## API Endpoints

- **Create a Product**
  - `POST /products`
  - Request Body: `{ "name": "Product Name", "price": 100, "category": "Category Name" }`

- **Get All Products**
  - `GET /products`

- **Update a Product**
  - `PUT /products/:id`
  - Request Body: `{ "name": "Updated Product Name", "price": 150, "category": "Updated Category Name" }`

- **Delete a Product**
  - `DELETE /products/:id`

## License

This project is licensed under the ISC License.