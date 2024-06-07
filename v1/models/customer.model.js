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
    match: [/\S+@\S+\.\S+/, 'is invalid'],
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d{10,15}$/, 'is invalid'], // Adjust regex for your needs
  },
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  company: String,
  jobTitle: String,
  notes: String,
  status: {
    type: String,
    enum: ['active', 'inactive'],
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