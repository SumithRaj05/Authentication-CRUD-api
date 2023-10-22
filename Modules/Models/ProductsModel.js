const mongoose = require('mongoose');
const db = require('./MainDatabaseConnector');

const Schema = mongoose.Schema;

// Define the Product schema
const productSchema = new Schema({
  SellerId: {
    type: Schema.Types.ObjectId,
    ref: 'Seller', 
  },
  ProductName: {
    type: String,
    required: true,
  },
  ProductImage: {
    type: String,
    required: true,
  },
  About: {
    type: String,
    required: true,
  },
  Catalogue: {
    type: String,
    required: true,
  },
  Quantity: {
    type: Number,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
});

// Create the Product model
const Product = db.model('Product', productSchema);

module.exports = Product;
