const mongoose = require('mongoose');
const db = require('./MainDatabaseConnector');

const Schema = mongoose.Schema;

// Define the Orders schema
const orderSchema = new Schema({
  BuyerId: {
    type: Schema.Types.ObjectId,
    ref: 'Buyer', 
  },
  SellerId: {
    type: Schema.Types.ObjectId,
    ref: 'Seller', 
  },
  ShippingId: {
    type: Schema.Types.ObjectId,
    ref: 'Shipping', 
  },
  TransactionId: {
    type: String,
    ref: 'Transaction', 
  },
  OrderDetailsId: {
    type: Schema.Types.ObjectId,
    ref: 'OrderDetails', 
  },
  OrderDate: {
    type: Date,
    default: Date.now,
  },
  TotalAmount: {
    type: Number,
    required: true,
  },
  Status: {
    type: String,
    enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
});

// Create the Orders model
const Order = db.model('Order', orderSchema);

module.exports = Order;
