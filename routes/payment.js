const {Router} = require('express');
const { createOrder, captureOrder, cancelOrder } = require('../controllers/payment');

const router =Router();

router.post('/api/create-order',createOrder)

router.get('/api/capture-order',captureOrder)

router.get('/api/cancel-order',cancelOrder)



module.exports=router;