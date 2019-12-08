const express = require('express');
const router = express.Router();
const mongoose = require ('mongoose');

const Cart = require('../models/cart_model');
const Shoes = require('../models/shoes_model');

router.get('/', (req, res, next) => {
    Cart.find()
        .select('-__v')
        .populate('shoes', '-__v')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                cart: docs.map(doc => {
                    return {
                        cart: doc,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/cart/' + doc._id
                        }
                    }
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});
    
router.post('/', (req, res, next) => {
    Shoes.findById(req.body.shoesID)
        .then(shoes => {
            if (!shoes) {
                return res.status(404).json({
                    message: 'shoes not found'
                });
            };
            const cart = new Cart({
                _id: mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                shoes: req.body.shoesID
            });
            return cart.save()
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Cart made',
                createdCart: {
                    _id: result.id,
                    shoes: result.shoes,
                    quantity: result.quantity
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/cart/' + result.id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:cartID', (req, res, next) => {
    Cart.findById(req.params.cartID)
        .select('-__v')
        .populate('shoes', '-__v')
        .exec()
        .then(cart => {
            if (!cart) {
                return res.status(404).json({
                    message: "Cart not found"
                });
            }
            res.status(200).json({
                cart: cart,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/cart/'
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:cartID', (req, res, next) => {
    Cart.remove({ _id: req.params.cartID })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Cart deleted',
                require: {
                    type: 'POST',
                    url: 'http://localhost:3000/cart/',
                    body: { shoesID: "ID", quantity: "Number" }
                }
            });
        });
});
module.exports = router;
