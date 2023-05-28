const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const Flutterwave = require('flutterwave-node');

//Process stripe payments => /api/v1/payment/process

exports.processPayment = catchAsyncErrors(async (req, res, next) => {

    const { amount, currency } = req.body;
    const flutterwave = new Flutterwave(process.env.FLUTTERWAVE_PUBLIC_KEY, process.env.FLUTTERWAVE_SECRET_KEY);

    const paymentData = {
        tx_ref: Date.now().toString(),
        amount: amount,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd, banktransfer',
        meta: {
            consumer_id: req.user.id,
            email: req.user.email,
        },
        customer: {
            email: req.user.email,
            phonenumber: shippingInfo.phone,
            name: req.user.firstName + ' ' + req.user.lastName
        },
        customizations: {
            title: 'My Store',
            description: 'Payment for items in cart',
            logo: 'https://assets.piedpiper.com/logo.png'
        }
    };

    const paymentIntent = await flutterwave.initializePayment(paymentData);

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })

});

// Send flutterwave Public Key   =>   /api/v1/flutterwaveapi
exports.sendFlutterwaveApi = catchAsyncErrors(async (req, res, next) => {

    res.status(200).json({
        success: true,
        flutterwaveApiKey: process.env.FLUTTERWAVE_PUBLIC_KEY
    });

});



