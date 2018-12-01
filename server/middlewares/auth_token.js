const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config');
var httpMsgs = require('../core/httpMsgs');
var bodyParser = require('body-parser');
module.exports = function (req, res, next) {
    if(req.originalUrl.indexOf("api") < 0)
        return next();

    let excludedUrls = ['/api/','/api/check-maintain','/api/coming-soon-pages', '/api/auth/steam','/api/ref/:code', '/api/user/steam', '/api/master-packs', '/api/pack-tabs', '/item-players/:id', '/pages/:id'];
    
    if (excludedUrls.indexOf(req.path) > -1) return next();

    if(req.path.split("/")[req.path.split("/").length - 2] == "item-players") return next();
    if(req.path.split("/")[req.path.split("/").length - 2] == "pages") return next();
    if(req.path.split("/")[req.path.split("/").length - 2] == "ref") return next();

    if(req.headers['authorization'] === undefined){
      return res.status(403).send({ 
          status: false, 
          message: 'Please login first to continue.'  
      });
    }
    // check header or url parameters or post parameters for token
    let token = req.headers['authorization'].split(" ")[1];
    let meta = {code: 401, success: false};

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.authTokenSuperSecret,{ignoreExpiration: true}, function (err, decoded) {
            // console.log('Verifying token!');
            if (err) {
                let message = "";
                if (err.name) {
                    switch (err.name) {
                        case "TokenExpiredError":
                            message = "You are not logged in!";
                            break;
                        default:
                            message = "Please login";
                            break;
                    }
                }
                httpMsgs.show401(req, res, message);
            } else {
                req.userId = decoded.userId;
                return next();
            }
        });

    } else {
        let message = "Please login to continue.";
        httpMsgs.show401(req, res, message);
    }
};