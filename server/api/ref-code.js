const router = require('express').Router();
const passport = require('passport');
var code = "";


router.get('/ref/:code',(req,res,next)=>{
	code = req.params.code;
	next();
}, passport.authenticate('steam'));
module.exports = router;
module.exports = code;