const validator = require('../helpers/validate');


const createUser = (req,res)=>{
    let jsonData = req.body;
    // let  m = new bodyValidator
    let validationRule = {
        name:'required',
        email:'required',
        password:'required'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if(!status){
            res.status(200).json({ status: false, message: "saad",error: err.errors});
        }
        else{
            res.status(200).json({ status: true, message: "sfsdf",error: status});
        }
    });
    // console.log(jsonData)

}


module.exports = {
    createUser
}