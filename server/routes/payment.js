const express = require('express')
const router = express.Router();

const {
    processPayment,
    sendFlutterwaveApi
} = require('../controllers/paymentController')

const { isAuthenticatedUser } = require('../middlewares/auth')

router.route('/payment/process').post(isAuthenticatedUser, processPayment);
router.route('/flutterwaveapi').get(isAuthenticatedUser, sendFlutterwaveApi);

module.exports = router;