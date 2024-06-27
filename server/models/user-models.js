const {Schema, model,default:mongoose}= require("mongoose");
//const bcrypt= require("bcryptjs");
//const jwt =require("jsonwebtoken");
const UserSchema= new Schema({

    username:{
        type: String,
        require:true,
    },
    email:{
        type: String,
        require:true,
    },
    phone:{
        type: String,
        require:true,
    },
    password:{
        type: String,
        require:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    }
    
});

UserSchema.pre("save", async function(next){
    //to display the data which is stored in the databse
    console.log("pre methord",this);
});






const User = new model("User",UserSchema);


module.exports = User;