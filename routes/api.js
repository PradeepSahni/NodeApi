const express = require("express");
const Router = express.Router();
const UserController = require('../controllers/UserController');
const api = require('../middleware/auth');

const initApiRoutes = (app)=>{
    Router.post('/createUser',UserController.createUser);
    Router.post('/login',UserController.login);
    Router.get('/getProfile',api.authMiddleWare,UserController.getProfile);
    return app.use("/api/",Router);
}

module.exports = initApiRoutes;