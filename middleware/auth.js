const  {verify} = require('jsonwebtoken');

const authMiddleWare = (req,res,next)=>{
    let authorization = req.get('Authorization');
    if(authorization){
        let token  = authorization.split(' ')[1];
        if(token){
            verify(token,process.env.SECRET_KEY,(err,decode)=>{
                if(err){
                    return res.json({ success: 0, message: "Invalid token!"});
                }
                else{
                    req.User = decode.result;
                    next();
                }
            })
            
        }
        else{
            return res.json({ success: 0, message: "Invalid token!"});
        }
    }
    else{
        return res.json({
            success: 0,
            message: "Access Denied Unothorized user !"
        })
    }
}

module.exports = {
    authMiddleWare
}