const { Nuxt, Builder } = require('nuxt')
const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const passport = require('passport')
const SteamStrategy = require('../').Strategy;
const steam_users = require( './models/steam_users');

const apiRoutes = require('./api/index');

// Testing Steam Start
var jwt = require('jsonwebtoken');
var util = require('util');
var localConfig = require('./config');
var db = require('./core/db');

var server = express();

const host = '192.168.1.17';
const port = '3000';
const hosturl = host+':'+port;
// const host = '46.101.248.211';
// const port = '80';
// const hosturl = 'csgoultimate.gg'


process.env.HOST = host;
process.env.PORT = port;
process.env.HOSTURL = hosturl;

// Use the SteamStrategy within Passport.
//   Strategies in passport require a `validate` function, which accept
//   credentials (in this case, an OpenID identifier and profile), and invoke a
//   callback with a user object.
// For serving static files from public directory
// server.use(express.static('public'));
server.use(cookieParser());
server.use(bodyParser());
server.use(session({
  secret: 'securemarkivdeveloper'
}));
server.use(passport.initialize());
server.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

server.get('/auth/steam/return', passport.authenticate('steam', {
  failureRedirect: 'http://'+hosturl,
  successRedirect: 'http://'+hosturl,
  failureFlash: true
}));

server.get('/auth/logout', function (req, res) {
  req.logout();
  req.session.destroy();
  res.redirect('/');
})

//api routes
apiRoutes(server);


// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build();
}

// Give nuxt middleware to express
server.use(nuxt.render)

// Listen the server
server.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console