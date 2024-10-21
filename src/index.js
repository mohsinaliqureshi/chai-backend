
import dotenv from 'dotenv';
import connectDB from './db/index .js'; 

dotenv.config();

connectDB();







// method 2 of conecting database
/*
import express from "express";
const app = express()



(async ()=>{
try {
    await 
    mongoose.connect(`${process.env.MONGODB_URI}/$
        {DB_NAME}`)
        app.on("error",(error)=>{
            console.log("error", error)
            throw error

        })

        app.listen(process.env.PORT,()=>{
            console.log(`app is listening on port${process.env.port}`)
        })
    
} catch (error) {
    console.log( "Error",error)
    throw err
}
})()
*/