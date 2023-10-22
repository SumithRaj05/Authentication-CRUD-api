const mongoose = require('mongoose');
const db = require('./MainDatabaseConnector');

const Schema = mongoose.Schema;

// Define the Shipping schema
const shippingSchema = new Schema({
  BuyerId: {
    type: Schema.Types.ObjectId,
    ref: 'Buyer', 
  },
  OrderId: {
    type: Schema.Types.ObjectId,
    ref: 'Order', 
  },
  Country: {
    type: String,
    required: true,
  },
  State: {
    type: String,
    required: true,
  },
  City: {
    type: String,
    required: true,
  },
  PostalCode: {
    type: String,
    required: true,
  },
  StreetAddress: {
    type: String,
    required: true,
  },
});

// Create the Shipping model
const Shipping = db.model('Shipping', shippingSchema);

module.exports = Shipping;
