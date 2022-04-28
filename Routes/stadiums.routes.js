const express = require('express');
const router = express.Router();
const Auth = require("../middlewares/auth");
const ownerAuth = require("../middlewares/ownerAuth");
const AdminAuth = require("../middlewares/adminAuth");
const StadiumController = require("../Controllers/stadiumController");
router.get('/all',StadiumController.getAllStadiums)
router.post('/add',ownerAuth,StadiumController.AddStadium)
router.post('/id',StadiumController.getStadiumById)
router.post('/city',StadiumController.getStadiumsByCity)
router.post('/name',StadiumController.getStadiumsByName)
router.post('/rating',StadiumController.getStadiumsByRating)
router.post('/rate',Auth,StadiumController.rateStadium)
router.post('/verifyStadium',AdminAuth,StadiumController.verifyStadium)
router.post('/disableStadium',AdminAuth,ownerAuth,StadiumController.disableStadium)
router.get('/inverified',StadiumController.getInVerifiedStadiums)
module.exports = router
