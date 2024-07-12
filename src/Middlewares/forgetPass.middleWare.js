import { userModel } from "../../DB/Models/User/user.models.js"
import { sendMail } from "../Services/send-email.service.js";
import { ErrorApp } from "../Utils/ErrorApp.utils.js"
import jwt from 'jsonwebtoken';




// Middleware to handle password recovery
export const forget_Password_Middleware = async (req, res, next) => {

    // Extracting email, mobileNumber, and recoveryEmail from request body
    const { email, mobileNumber, recoveryEmail } = req.body

    // Generating a 4-digit OTP
    const otp = Math.ceil(Math.random() * (9999 - 1000 + 1)) + 1000;

    // Setting OTP expiration time to 30 minutes from now
    const expDate = new Date(new Date().getTime() + 30 * 60000);


    // Updating user with OTP and expiration date if email, mobileNumber, or recoveryEmail matches
    const findByMail = await userModel.findOneAndUpdate(
        { $or: [{ email }, { mobileNumber }, { recoveryEmail }] },
        { $set: { otpCode: otp, otpExpire: expDate } }, { new: true })


    // If user is not found, pass an error to the next middleware
    if (!findByMail) return next(new ErrorApp("Couldn't find User", 404))



    // Sending OTP via email
    const sendEmail = await sendMail({
        to: findByMail.email,
        subject: "Jop Applications",
        text: otp + "",
    })


    // If email is not sent, pass an error to the next middleware
    if (sendEmail.rejected.length) next(new ErrorApp("Email not sent", 400))

    res.json({ message: "success" })
}

// Middleware to check if the OTP exists and is valid
export const check_otp_exsists = async (req, res, next) => {
    const { otp } = req.body

    // Getting current date and time
    const targetDate = new Date();

    // Checking if OTP exists and is not expired
    const check_otp = await userModel.findOne({ $and: [{ otpCode: otp }, { otpExpire: { $gt: targetDate } }] })

    // If OTP is valid, respond with success message, otherwise pass an error to the next middleware

    return check_otp ? res.json({ message: "Otp Success" }) :
        next(new ErrorApp("Invalid otp", 400))

}