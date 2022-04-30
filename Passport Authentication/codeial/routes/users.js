const express = require("express");
const router = express.Router();
const passport = require("passport");

const usersController = require("../controllers/usercontroller");

router.get('/profile',passport.checkAuthentication, usersController.profile);

router.get("/sign-up",usersController.signup);
router.get("/sign-in", usersController.signin);


router.post("/create", usersController.create);

//use passport as a middleware to authenticate
router.post("/create-session", passport.authenticate(
    'local',
    {failureRedirect:"/users/sign-in"},
),usersController.createSession);

router.get("/sign-out",usersController.destroySession);
console.log("user router loaded");
module.exports = router;
