const mongoose = require('mongoose');

const shoesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
});

module.exports = mongoose.model('Shoes', shoesSchema);