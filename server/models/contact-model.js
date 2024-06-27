const {Schema, model, default: mongoose} = require("mongoose");


const contactSchema = new Schema({

    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    },

    isAdmin:{
        type:Boolean,
        default:false,
    }
    


});


    //create a model collection

    const Contact =  new model("Contact",contactSchema);

    module.exports = Contact;