const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /cart'
    });
});
    
router.post('/', (req, res, next) => {
    const cart = {
        shoesID: req.body.shoesID,
        quantity: req.body.quantity
    };
    res.status(201).json({
        message: 'Handling POST requests to /cart',
        createdCart: cart
    });
});

router.get('/:cartID', (req, res, next) => {
    const id = req.params.cartID;
    res.status(200).json({
        message: 'cart found'
    });
});

router.delete('/:cartID', (req, res, next) => {
    const id = req.params.cartID;
    res.status(200).json({
        message: 'deleted cart'
    });
});
module.exports = router;
