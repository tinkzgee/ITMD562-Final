const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Shoes = require('../models/shoes_model'); //shoe module with schema

router.get('/', (req, res, next) => {
    Shoes.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
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
            console.log(result)
            res.status(201).json({
                message: 'Handling POST requests to /shoes',
                createdShoes: shoes
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
        .exec()
        .then(doc => { //passing the doc
            console.log("From DB:", doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

router.patch('/:shoesID', (req, res, next) => {
    const id = req.params.shoesID;

});

router.delete('/:shoesID', (req, res, next) => {
    const id = req.params.shoesID;
    Shoes.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});


module.exports = router;
