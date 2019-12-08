const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    shoes: { type: mongoose.Schema.Types.ObjectId, 
        ref: 'Shoes', require: true },
    quantity: { type: Number, default: 1}
});

module.exports = mongoose.model('Cart', cartSchema);