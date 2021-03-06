const router = require('express').Router();
const passport = require('passport');
const SteamStrategy = require('../../').Strategy;
var jwt = require('jsonwebtoken');
var config = require('../config.js');
var sequelize = require('../db.js');

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || '3000'
// Get All my packs

router.post('/coins-history', function (req, res) { 
 
    var newData = new sequelize.models.coinsHistory({
        userId : req.body.userId,
        date:req.body.date,
        amount:req.body.amount,
        balance:req.body.balance,
        description:req.body.description
    });
  
    newData.save().then(user => { 
        res.send({status:true, data:user});  
    }).catch(error => {
        res.send({status:false, error:error});
    });
})

/* Testing Open Pack API */
router.get('/open-pack', function (req, res) { 
 
    var data  = {
                   "masterPack":{
                      "cardType":{
                         "label":"Bronze"
                      },
                      "price":1500,
                      "cardAmount":10,
                      "minimumGoldAmount":1,
                      "minimumPlayerAmount":1
                   },
                   "userPlayerCards":[
                      {
                         "playerCard":{
                            "player":{
                               "team":{
                                  "teamName":"PRIDE",
                                  "logoUrl":"http://cdn.csgoultimate.gg/images/csgoultimateimage-1501657129886.png"
                               },
                               "country":{
                                  "countryName":"Poland",
                                  "imageUrl":"http://cdn.csgoultimate.gg/images/csgoultimateimage-1501499612510.jpg"
                               },
                               "pictureUrl":"http://cdn.csgoultimate.gg/images/csgoultimateimage-1502354360820.png",
                               "playerName":"MINISE"
                            },
                            "role":{
                               "shortName":"AWP"
                            },
                            "backgroundUrl":"http://cdn.csgoultimate.gg/images/csgoultimateimage-1501636171762.png",
                            "overallScore":"70",
                            "rifleScore":"69",
                            "awpScore":"76",
                            "clutchScore":"65",
                            "entryScore":"73",
                            "pistolScore":"71",
                            "iqScore":"74",
                            "cardType":{
                               "label":"Silver"
                            },
                            "rarityLevelId":1,
                            "rarityLevel":{
                               "id":1,
                               "level":1,
                               "quickSellValue":25
                            }
                         }
                      },
                      {
                         "playerCard":{
                            "player":{
                               "team":{
                                  "teamName":"Astralis",
                                  "logoUrl":"http://cdn.csgoultimate.gg/images/csgoultimateimage-1501496657301.png"
                               },
                               "country":{
                                  "countryName":"Denmark",
                                  "imageUrl":"http://cdn.csgoultimate.gg/images/csgoultimateimage-1501496591918.jpg"
                               },
                               "pictureUrl":"http://cdn.csgoultimate.gg/images/csgoultimateimage-1502087878116.png",
                               "playerName":"Xyp9x"
                            },
                            "role":{
                               "label":"Clutch",
                               "shortName":"CLU"
                            },
                            "backgroundUrl":"http://cdn.csgoultimate.gg/images/csgoultimateimage-1501636182881.png",
                            "overallScore":"88",
                            "rifleScore":"85",
                            "awpScore":"23",
                            "clutchScore":"96",
                            "entryScore":"78",
                            "pistolScore":"80",
                            "iqScore":"92",
                            "cardType":{
                               "label":"Gold"
                            },
                            "rarityLevel":{
                               "quickSellValue":25
                            }
                         }
                      },
                      {
                         "playerCard":{
                            "player":{
                               "team":{
                                  "teamName":"Igame",
                                  "logoUrl":"http://cdn.csgoultimate.gg/images/csgoultimateimage-1501500252178.png"
                               },
                               "country":{
                                  "countryName":"Finland",
                                  "imageUrl":"http://cdn.csgoultimate.gg/images/csgoultimateimage-1501498478732.jpg"
                               },
                               "pictureUrl":"http://cdn.csgoultimate.gg/images/csgoultimateimage-1503949601183.png",
                               "playerName":"BASiC"
                            },
                            "role":{
                               "shortName":"AWP"
                            },
                            "backgroundUrl":"http://cdn.csgoultimate.gg/images/csgoultimateimage-1501636171762.png",
                            "overallScore":"79",
                            "rifleScore":"79",
                            "awpScore":"75",
                            "clutchScore":"85",
                            "entryScore":"81",
                            "pistolScore":"76",
                            "iqScore":"78",
                            "cardType":{
                               "label":"Silver"
                            },
                            "rarityLevel":{
                               "quickSellValue":25
                            }
                         }
                      },
                      {
                         "playerCard":{
                            "player":{
                               "team":{
                                  "teamName":"Planetkey Dynamics",
                                  "logoUrl":"http://cdn.csgoultimate.gg/images/csgoultimateimage-1501656122879.png"
                               },
                               "country":{
                                  "countryName":"Germany",
                                  "imageUrl":"http://cdn.csgoultimate.gg/images/csgoultimateimage-1501498469252.jpg"
                               },
                               "pictureUrl":"http://cdn.csgoultimate.gg/images/csgoultimateimage-1502392251953.png",
                               "playerName":"AlexRr"
                            },
                            "role":{
                               "label":"Ingame leader",
                               "shortName":"IGL"
                            },
                            "special":false,
                            "backgroundUrl":"http://cdn.csgoultimate.gg/images/csgoultimateimage-1501636153905.png",
                            "overallScore":"61",
                            "rifleScore":"61",
                            "awpScore":"53",
                            "clutchScore":"60",
                            "entryScore":"53",
                            "pistolScore":"60",
                            "iqScore":"58",
                            "cardType":{
                               "label":"Bronze"
                            },
                            "rarityLevel":{
                               "quickSellValue":25
                            }
                         }
                      },
                      {
                         "playerCard":{
                            "player":{
                               "team":{
                                  "teamName":"Fnatic Academy",
                                  "logoUrl":"http://cdn.csgoultimate.gg/images/csgoultimateimage-1501658733236.png"
                               },
                               "country":{
                                  "countryName":"Sweden",
                                  "imageUrl":"http://cdn.csgoultimate.gg/images/csgoultimateimage-1501499811472.jpg"
                               },
                               "pictureUrl":"http://cdn.csgoultimate.gg/images/csgoultimateimage-1502469634557.png",
                               "playerName":"Plessen"
                            },
                            "role":{
                               "label":"Clutch",
                               "shortName":"CLU"
                            },
                            "backgroundUrl":"http://cdn.csgoultimate.gg/images/csgoultimateimage-1501636171762.png",
                            "overallScore":"79",
                            "rifleScore":"84",
                            "awpScore":"75",
                            "clutchScore":"85",
                            "entryScore":"79",
                            "pistolScore":"80",
                            "iqScore":"74",
                            "cardType":{
                               "label":"Silver"
                            },
                            "rarityLevel":{
                               "quickSellValue":25
                            }
                         }
                      }
                   ]
                }
                res.send({data:data});
})


module.exports = router;