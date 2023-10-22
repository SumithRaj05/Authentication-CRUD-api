const mongoose = require('mongoose');
const db = require('./MainDatabaseConnector');

const Schema = mongoose.Schema;

// Define the OrderDetails schema
const orderDetailsSchema = new Schema({
  ProductId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
  Quantity: {
    type: Number,
    required: true,
  },
  Price: {
    type: Number,
  },
});

// Create the OrderDetails model
const OrderDetails = db.model('OrderDetails', orderDetailsSchema);

module.exports = OrderDetails;
