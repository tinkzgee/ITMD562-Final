const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Shoes = require('../models/shoes_model'); //shoe module with schema

router.get('/', (req, res, next) => {
    Shoes.find()
        .select('-__v')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                shoes: docs.map(doc => {
                    return {
                        shoes: doc,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/shoes/" + doc._id
                        }
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});
    
router.post('/', (req, res, next) => {
    const shoes = new Shoes ({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    shoes
        .save()
        .then(result => {
            res.status(201).json({
                message: 'Added shoes to cart',
                createdShoes: {
                    name: result.name,
                    price: result.price,
                    _id: result.id
                },
                request: {
                    type: "GET",
                    url: "http://localhost:3000/shoes/" + result._id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
});

router.get('/:shoesID', (req, res, next) => {
    const id = req.params.shoesID; //finding from url
    Shoes.findById(id) //finding the shoe
        .select('-__v')
        .exec()
        .then(doc => { //passing the doc
            res.status(200).json({
                shoes: doc,
                request: {
                    type: 'GET',
                    description: 'Get all shoes',
                    url: 'http://localhost:3000/shoes/'
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

router.patch('/:shoesID', (req, res, next) => {
    const id = req.params.shoesID;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] =ops.value;
    }
    Shoes.updateOne({ _id: id}, {$set: updateOps})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'shoes updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/shoes/' + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

router.delete('/:shoesID', (req, res, next) => {
    const id = req.params.shoesID;
    Shoes.deleteOne({ _id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "shoes deleted",
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/shoes/',
                    body: { name: 'String', price: 'number'}
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});


module.exports = router;
