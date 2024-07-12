import { userModel } from "../../../DB/Models/User/user.models.js";
import { sendMail } from "../../Services/send-email.service.js";
import { ErrorApp } from "../../Utils/ErrorApp.utils.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';



export const SignUp = async (req, res, next) => {
    let { status, firstName, lastName, username, email, password, recoveryEmail, DOB, mobileNumber, role } = req.body;
    username = username || firstName + " " + lastName
    let newUser = new userModel({ role, status, firstName, lastName, username, email, password: req.password, recoveryEmail, DOB, mobileNumber })

    // confirmation signture
    let signtutre = process.env.CONFIRMATION_SECRET;


    // create confirm email token
    jwt.sign({
        id: newUser._id,
        email: newUser.email,
        recoveryEmail: newUser.recoveryEmail,
        mobileNumber: newUser.mobileNumber,
    }, signtutre, async (err, token) => {

        if (err) return next(new ErrorApp(err.message, 401, err.stack));

        const confirmLink = `${req.protocol}://${req.headers.host}/user/verifyMail/${token}`

        // send confirmation link to email 
        const sendEmail = await sendMail({
            to: email,
            subject: "Jop Applications",
            text: `Hello ${username}`,
            confirmationLink: confirmLink
        })

        if (sendEmail.rejected.length) next(new ErrorApp("Email not sent", 400))

        // save user in database
        const newUserAdd = await newUser.save()

        res.json({ message: "success", newUserAdd })
    })

}



// set confirmed true 
export const verifyMail = async (req, res, next) => {
    await userModel.updateOne({ email: req.user.email }, { $set: { isConfirmed: true } })
    res.json({ message: "User updated Successfully" })

}



export const SignIn = async (req, res, next) => {
    const { email, password, recoveryEmail, mobileNumber } = req.body

    const loginUser = await userModel.findOneAndUpdate({ $or: [{ email }, { recoveryEmail }, { mobileNumber }] }, { $set: { status: "online" } })

    if (!loginUser || !bcrypt.compareSync(password, loginUser.password)) return next(new ErrorApp("Check Mail Or Password", 404))

    // create token for login user
    jwt.sign({
        id: loginUser._id,
        email: loginUser.email,
        recoveryEmail: loginUser.recoveryEmail,
        mobileNumber: loginUser.mobileNumber
    }, process.env.LOGIN_SECRET, (err, token) => {
        if (err) return next(new ErrorApp(err.message, 401, err.stack))
        req.id = loginUser._id;
        res.json({ message: "success", token })
    })

}

// update user account
export const update_account = async (req, res, next) => {
    const { email, mobileNumber, recoveryEmail, DOB, lastName, firstName } = req.body

    const updateUser = await userModel.updateOne({ _id: req.user._id },
        {
            // handle if the user do not send empty data  
            $set: {
                email: email || req.user.email,
                mobileNumber: mobileNumber || req.user.mobileNumber,
                recoveryEmail: recoveryEmail || req.user.recoveryEmail,
                DOB: DOB || req.user.DOB,
                lastName: lastName || req.user.lastName,
                firstName: firstName || req.user.firstName,
                username: `${firstName} ${lastName}` || req.user.username
            }
        }
    )

    return updateUser.modifiedCount && updateUser.matchedCount ? res.json({ message: "Updated successfully " })
        : next(new ErrorApp("Couldn't update", 304))
}


export const Delete_account = async (req, res, next) => {
    const { id } = req.params;

    const deleteUser = await userModel.deleteOne({ _id: id })

    return deleteUser ? res.json({ message: 'Delete Account Success ' }) :
        next(new ErrorApp("Account not found", 404));
}

export const Get_user = async (req, res, next) => {
    const user = req.user;
    user.password = undefined;
    res.json({ message: 'Success', user })
}




export const Get_another_user = async (req, res, next) => {
    const { id } = req.params || req.query;
    const user = await userModel.findById(id);
    res.json({ message: 'Success', user })
}

export const Update_Password = async (req, res, next) => {
    const user = req.user;

    await userModel.updateOne({ _id: user._id }, { $set: { password: req.password } })

    res.json({ message: 'Update password Success' })
}



export const set_New_Password = async (req, res, next) => {
    const { email, mobileNumber } = req.body;

    await userModel.updateOne({ $or: [{ email }, { mobileNumber }] }, { password: req.password, otpCode: "unknown" })

    res.json({ message: 'Reset password Success' })
}


export const Get_all_specific_recovery_Email = async (req, res, next) => {
    const { recoveryEmail } = req.body;

    const all_recoveryEmail = await userModel.find({ recoveryEmail }).select("-password  ")

    return all_recoveryEmail.length ? res.json({ message: 'Success', all_recoveryEmail })
        : next(new ErrorApp("Invalid recovery email", 400))


}


