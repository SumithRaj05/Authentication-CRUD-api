const mongoose = require('mongoose');
const db = require('./MainDatabaseConnector');

const Schema = mongoose.Schema;

// Define the UserAccount schema
const userAccountSchema = new Schema({
  SellerId: {
    type: Schema.Types.ObjectId,
    default: null,
  },
  BuyerId: {
    type: Schema.Types.ObjectId,
    default: null,
  },
  FullName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  MobileNumber: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  }
});

// Create the UserAccount model
const UserAccount = db.model('UserAccount', userAccountSchema);

module.exports = UserAccount;