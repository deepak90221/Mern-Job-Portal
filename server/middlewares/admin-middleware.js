const adminMiddleware = async(req,res,next)=>{
    try {
        console.log(req.user);
        const adminRole = req.user.isAdmin;

        if(!adminRole) {

                res.status(404).json({error: "access denied"});
        }
        //res.status(200).json({msg: req.user.isAdmin});

        next();
    } catch (error) {
        next(error);
        
    }
};


module.exports = adminMiddleware;