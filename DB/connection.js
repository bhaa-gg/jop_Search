import { config } from "dotenv";
import mongoose from "mongoose";


export const dbConnection = () => {
    mongoose.connect(process.env.CONNECTION_DB_URI_ATLAS).then(() => {
        console.log("Connecting to database");
    }).catch(err => {
        console.log("Error connecting to database" + err.message);
    })
}