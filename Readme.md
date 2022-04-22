# initialize npm 
    npm init -y
# install express ,mysql2,sequelize,nodemon package 
    npm i express  mysql2 sequelize nodemon
# install  Sequlize 
    npm install --save-dev sequelize-cli
# init  Sequlize 
    npx sequelize-cli init
# create user model 
    npx sequelize-cli model:generate --name User --attributes name:string,email:string,password:string
# connect to your local DB into  config folder 
    "development": {
        "username": "root",
        "password": "",
        "database": "rewoke_node_api_test",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
# create index.js to  start node application 
    touch index.js
# put somne code into  index.js
    const express = require('express');
    let app = express();
    let  router = express.Router();
    let port = 8000;

    router.get('/',(req,res)=>{
        res.write("Welcome to  Node js")
        res.end();
    });
    app.use("/", router);
    app.listen(port, () => console.log(`Building a login system with NodeJS is running on port ${port}!`));

# add  line some scripts into the package.json file 
        "start": "nodemon app.js" 

# Run Node application  
    npm start


# to  receive req.body into every  controller 
   npm i body-parser
   const bodyParser = require('body-parser');
   app.use(bodyParser.json());



# Some validation url  
   https://blog.logrocket.com/how-to-handle-data-validation-in-node-using-validatorjs/
   https://www.npmjs.com/package/node-input-validator
   -----------------------------------------------------------
   npm install validatorjs
   mkdir helpers
   touch helpers/validate.js
   var validate = require("validatorjs");
   const Validator = (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
    };

    module.exports = validator;

    const validator = require('../helpers/validate');
    const signup = (req, res, next) => {
        const validationRule = {
            "email": "required|email",
            "username": "required|string",
            "phone": "required|string",
            "password": "required|string|min:6|confirmed",
            "gender": "string"
        }
        validator(req.body, validationRule, {}, (err, status) => {
                if (!status) {
                    res.status(412)
                        .send({
                            success: false,
                            message: 'Validation failed',
                            data: err
                        });
                } else {
                    next();
                }
        });
    }
