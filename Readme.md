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
------------------
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