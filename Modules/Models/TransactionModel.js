const mongoose = require('mongoose');
const db = require('./MainDatabaseConnector');

const Schema = mongoose.Schema;

// Define the Transaction schema
const transactionSchema = new Schema({
  OrderId: {
    type: Schema.Types.ObjectId,
    ref: 'Order', 
  },
  PaymentMethod: {
    type: String,
    required: true,
  },
  TransactionDate: {
    type: Date,
    default: Date.now,
  },
  TransactionAmount: {
    type: Number,
    required: true,
  },
  TransactionId: {
    type: String,
    required: true,
  },
});

// Create the Transaction model
const Transaction = db.model('Transaction', transactionSchema);

module.exports = Transaction;
