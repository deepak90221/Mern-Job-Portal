




const validate = (schema)=>async (req,res,next)=>{
    try {

        //checking if the data is matching with the schema or not 
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (err) {
        console.log(message);
        const message=  err.errors[0].message;
        res.status(400).json({msg: message});
    }


};

module.exports = validate;