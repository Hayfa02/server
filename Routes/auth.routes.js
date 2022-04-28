const express = require('express');
const router = express.Router();
const Auth = require("../middlewares/auth");
const AdminAuth = require("../middlewares/adminAuth");
const authControllerr = require("../controllers/authController");
router.post('/signup',authControllerr.signup)
router.post('/signin',authControllerr.signin)
router.post('/email',authControllerr.findByEmail)
router.post('/signout',Auth,authControllerr.signout)
router.get('/confirmEmail/:token',authControllerr.confirmEmail)
router.post('/forgot-password',authControllerr.forgotPassword)
router.post('/reset-password',authControllerr.resetPassword)
router.post('/change-password',Auth,authControllerr.changePassword)
router.post('/add-phone-number',Auth,authControllerr.addPhoneNumber)
router.post('/verif-phone-number',Auth,authControllerr.verifPhoneNumber)
router.post('/disableAccount',AdminAuth,authControllerr.disableUsersAccount)
router.post('/activateAccount',AdminAuth,authControllerr.activateUsersAccount)
router.post('/users',AdminAuth,authControllerr.getAllUsers)
router.post('/upload',authControllerr.upload)
module.exports = router
