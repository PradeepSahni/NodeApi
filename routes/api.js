const express = require("express");
const Router = express.Router();
const UserController = require('../controllers/UserController');

const initApiRoutes = (app)=>{
    Router.post('/create_user',UserController.createUser);
    return app.use("/api/",Router);
}

module.exports = initApiRoutes;