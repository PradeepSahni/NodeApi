const express = require('express');
const initApiRoutes = require('./routes/api');
const bodyParser = require('body-parser');


let app = express();
let  router = express.Router();
let port = 8000;

app.use(bodyParser.json());

router.get('/',(req,res)=>{
    res.write("Welcome to  Node js")
    res.end();
});
app.use("/", router);

initApiRoutes(app);


app.listen(port, () => console.log(`Building a login system with NodeJS is running on port ${port}!`));