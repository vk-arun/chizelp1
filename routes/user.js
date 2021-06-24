const express = require("express");
const { model } = require("mongoose");
const User = require("../models/user");
const userController = require("../controllers/user");
const route = express.Router();


//user signup
route.post("/signup",  userController.create);
// user list 
route.post("/list", userController.verifyJwtToken, userController.list);
// user update 
route.post("/update",userController.verifyJwtToken, userController.update);
//user login
route.post("/login", userController.login);



module.exports = route;
