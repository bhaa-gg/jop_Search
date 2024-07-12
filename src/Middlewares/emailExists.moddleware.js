import { userModel } from "../../DB/Models/User/user.models.js";
import { ErrorApp } from "../Utils/ErrorApp.utils.js";

// Middleware to check if an email or mobile number already exists in the database
export const emailExists = async (req, res, next) => {

    // Extract email and mobile number from the request body
    const { email, mobileNumber } = req.body;

    // Search for a user with the given email or mobile number
    const findMail = await userModel.findOne({ $or: [{ email }, { mobileNumber }] })


    // If a user is found, call next with an error indicating the user already exists
    return findMail ? next(new ErrorApp("User already Exists ", 409)) : next()
}


// Middleware to check if a user with the given email or mobile number exists
export const user_Found = async (req, res, next) => {

    // Extract email and mobile number from the request body
    const { email, mobileNumber } = req.body;

    // Search for a user with the given email or mobile number
    const findMail = await userModel.findOne({ $or: [{ email }, { mobileNumber }] })

    // If a user is found, proceed to the next middleware
    return findMail ? next() : next(new ErrorApp("User Not found ", 404))
}
