const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    street: String,
    city: String,
    country: String,
  },
  company: String,
  jobTitle: String,
  notes: String,
  status: {
    type: String,
    default: 'active',
  },
  deleted: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const Customer = mongoose.model('Customer', customerSchema, "customers");

module.exports = Customer;