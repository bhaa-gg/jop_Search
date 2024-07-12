import jwt from "jsonwebtoken";
import { ErrorApp } from "../Utils/ErrorApp.utils.js";
import { userModel } from "../../DB/Models/User/user.models.js";


// Verify the token using JWT and the secret key for login from headers
export const verify_Registration_Token = async (req, res, next) => {
    const { token } = req.headers;

    // If token is missing, return an error
    if (!token) return next(new ErrorApp("Token is required", 404));

    // Verify the token using JWT and the secret key
    jwt.verify(token, process.env.LOGIN_SECRET, async (err, user) => {

        // If there's an error or the user ID is missing, return an error
        if (err || !user.id) return next(new ErrorApp(err.message, 401, err.stack))

        // Find the user in the database by  token ID
        const findUser = await userModel.findById(user.id)

        if (!findUser) return next(new ErrorApp("User not found by this token", 404))

        req.user = findUser;
        next();
    })
}


//Verify the token using JWT and the secret key for Confirm Mail from params
export const verify_ConfirmMail_Token = async (req, res, next) => {
    const { token } = req.params

    let signtutre = process.env.CONFIRMATION_SECRET;

    jwt.verify(token, signtutre, async (err, user) => {
        if (err || !user.id) return next(new ErrorApp(err, 400, err.stack))

        const findUser = await userModel.findById(user.id)

        if (!findUser) return next(new ErrorApp("User not found", 404))

        req.user = findUser

        next()
    })
}
