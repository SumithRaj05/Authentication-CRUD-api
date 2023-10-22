const mongoose = require('mongoose');
const db = require('./MainDatabaseConnector');

const Schema = mongoose.Schema;

// Define the Buyer schema
const buyerSchema = new Schema({
  OrderId: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
  },
});

// Create the Buyer model
const Buyer = db.model('Buyer', buyerSchema);

module.exports = Buyer;
