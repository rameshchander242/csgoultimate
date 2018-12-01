const checkToken = require('../middlewares/auth_token');
const common_middleware = require('../middlewares/common_middleware');
module.exports = (server) => {
	// All Routes
	server.use(checkToken,function (req, res, next) {
		
	   // Website you wish to allow to connect
	   res.setHeader('Access-Control-Allow-Origin', '*');

	   // Request methods you wish to allow
	   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	   // Request headers you wish to allow
	   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	   // Set to true if you need the website to include cookies in the requests sent
	   // to the API (e.g. in case you use sessions)
	   res.setHeader('Access-Control-Allow-Credentials', true);

	   // Pass to next layer of middleware
	   next();
	});

	server.use(common_middleware,function (req, res, next) {
		next();
	});
	
	server.use('/api', require('./auth'));
	server.use('/api', require('./steam-users'));
	server.use('/api', require('./redeem-coupons'));
	server.use('/api', require('./master-packs'));
	server.use('/api', require('./my-packs'));
	server.use('/api', require('./coins-history'));
	server.use('/api', require('./users'));
	server.use('/api', require('./maps'));
	server.use('/api', require('./item-players'));
	server.use('/api', require('./item-coaches'));
	server.use('/api', require('./item-fitness'));
	server.use('/api', require('./item-contract-cards'));
	server.use('/api', require('./item-switch-role-cards'));
	server.use('/api', require('./item-boost-role-cards'));
	server.use('/api', require('./item-boost-map-cards'));
	server.use('/api', require('./item-boost-team-cards'));
	server.use('/api', require('./item-switch-map-cards'));
	server.use('/api', require('./master-pack-types'));
	server.use('/api', require('./pack-tabs'));
	server.use('/api', require('./pages'));
	server.use('/api', require('./item-quick-sell'));
	server.use('/api', require('./history'));
	server.use('/api', require('./market-place'));
	// server.use('', require('./ref-code'));
}
