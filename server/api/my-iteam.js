const router = require('express').Router();
var redeem_coupons = require('../models/redeem_coupons');

// Get All Coupons
router.get('/coupons', function (req, res) { 
  redeem_coupons.getList(req, res);  
})

// Add New Coupon
router.post('/coupons', function (req, res) { 
    redeem_coupons.add(req, res, req.body);    
})

// Get Coupon details
router.get('/coupons/:id', function (req, res) { 
	const id = parseInt(req.params.id)
 	redeem_coupons.get(req, res, id);  
})

// Add New Coupon
router.post('/redeem-coupons', function (req, res) { 
    redeem_coupons.redeemCoupon(req, res, req.body);    
})



module.exports = router;
