const mongoose = require('mongoose');
const db = require('./MainDatabaseConnector');

const Schema = mongoose.Schema;

// Define the Seller schema
const sellerSchema = new Schema({
  UniqueId: {
    type: String,
    unique: true,
    required: true,
  },
  ProductId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
  CompanyName: {
    type: String,
    required: true,
  },
  BusinessType: {
    type: String,
    required: true,
  },
  GSTNumber: {
    type: String,
    required: true,
  },
  KYCIsVerified: {
    type: Boolean,
    default: false,
  },
});

// Create the Seller model
const Seller = db.model('Seller', sellerSchema);

module.exports = Seller;
