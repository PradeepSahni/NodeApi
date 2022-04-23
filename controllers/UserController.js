const validator = require('../helpers/validate');
const {genSaltSync,hashSync,compareSync} = require('bcrypt');
const {sign} = require('jsonwebtoken');
const db = require('../models/index');
const User = db.User;


const createUser = async (req,res)=>{
    let jsonData = req.body;
    let validationRule = {
        name:'required',
        email:'required',
        password:'required'
    };
    validator(jsonData, validationRule, {}, async (err, status) => {
        if(!status){
            res.status(400).json({ status: false, message: msgHelper.msg("MSG001", req.body.language),error: err.errors});
        }
        else{
            let  getUserData = await User.findOne({where:{email:jsonData.email}});
            if(getUserData==null){
                const salt = genSaltSync(10);
                jsonData.password = hashSync(jsonData.password,salt);
                let  createUserObject = {name:jsonData.name,email:jsonData.email,password:jsonData.password};
                let  createdUser = await User.create(createUserObject);
                res.status(200).json({ status: true, message: msgHelper.msg("MSG004", req.body.language),error: null,data:createdUser});
            }
            else{
                res.status(400).json({ status: false, message: msgHelper.msg("MSG001", req.body.language),error:{'email': ['This email is already been taken.']}});
            }
        }
    });
}

const login = async (req,res)=>{
    let jsonData = req.body;
    let  validationRule = {
        "email" : "required",
        "password" : "required"
    }
    validator(jsonData,validationRule,{},async (err,status)=>{
        if(!status){
            res.status(400).json({ status: false, message: msgHelper.msg("MSG001", req.body.language),error: err.errors});
        }
        else{
            let  getUserData = await User.findOne({where:{email:jsonData.email}});
            if(getUserData==null){
                res.status(400).json({ status: false, message: msgHelper.msg("MSG001", req.body.language),error:{'email': ['The email id is Invalid !.']}});
            }
            else{
                let isMatched= compareSync(jsonData.password,getUserData.password);
                if(isMatched){
                    const jsonwebtoken = sign({result:getUserData},process.env.SECRET_KEY,{expiresIn : process.env.TOKEN_EXPIRY});
                    res.status(200).json({ status: true, message: msgHelper.msg("MSG005", req.body.language),error: null,token:jsonwebtoken});
                }
                else{
                    res.status(400).json({ status: false, message: msgHelper.msg("MSG006", req.body.language),error:{'password': ['Invalid Password !.']}});
                }
            }
        }
    });
}

const getProfile = async (req,res)=>{
    if(req.User){
        var  getUserData = await User.findOne({where:{id:req.User.id}});
        delete getUserData['password'];
        res.status(200).json({ status: true, message: msgHelper.msg("MSG007", req.body.language),error: null,data:getUserData});
    }
}


module.exports = {
    createUser, login, getProfile
}