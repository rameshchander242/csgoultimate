const router = require('express').Router();
var steam_users = require('../models/steam_users');

//  Add steam login here..

router.get('/myusers', function (req, res, next) { 
    // testing
    steam_users.getList(req, res);
})


// router.get('/users/:id', function (req, res, next) {
//   const id = parseInt(req.params.id)
//   if (id >= 0 && id < users.length) {
//     res.json(users[id])
//   } else {
//     res.sendStatus(404)
//   }
// })

module.exports = router;
