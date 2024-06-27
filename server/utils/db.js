const mongoose =require("mongoose");

const URI = "mongodb://localhost:27017/mern_admin";


//const URI = "mongodb+srv://Deepak:@cluster0.vtgotrx.mongodb.net/mern_admin?retryWrites=true&w=majority&appName=Cluster0";
//mongoose.connect(URI);
const connectDB = async ()=>{
    try {
        await mongoose.connect(URI);
        console.log("connection established");
    } catch (error) {
        console.log("failed connection");
        process.exit(0);
        
    }
};


module.exports=connectDB;
