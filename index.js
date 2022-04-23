const express = require('express');
const initApiRoutes = require('./routes/api');
const bodyParser = require('body-parser');
global.msgHelper = require('./helpers/msg');
require('dotenv').config()

let app = express();
let  router = express.Router();

app.use(bodyParser.json());

router.get('/',(req,res)=>{
    res.write("Welcome to  Node js")
    res.end();
});
app.use("/", router);

initApiRoutes(app);

console.log(`Environment: ${process.env.NODE_ENV}`)
app.listen(process.env.PORT, () => console.log(`NodeJS is running on port ${process.env.PORT}`));