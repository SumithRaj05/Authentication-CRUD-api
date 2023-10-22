const mongoose = require('mongoose');
const db = require('./MainDatabaseConnector');

const Schema = mongoose.Schema;

// Define the Category schema
const categorySchema = new Schema({
  ProductId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
  CategoryName: {
    type: String,
    required: true,
  },
});

// Create the Category model
const Category = db.model('Category', categorySchema);

module.exports = Category;
