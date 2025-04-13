const adminAuth=(req,res,next)=>{
    const token="123";

    const isAuthorized= token==="123"

    if(!isAuthorized) {
       res.status(401).send("Authentication Failed")
    } else {
       next();
    }
}

const userAuth=(req,res,next)=>{
    const token=req.params.token;
     
    const isAuthorized= token==="123"

    if(!isAuthorized) {
       res.status(401).send("Authentication Failed")
    } else {
       next();
    }
}

module.exports={adminAuth,userAuth}