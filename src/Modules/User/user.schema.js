import Joi from "joi";
import { general_Validation_Rules } from "../../Utils/ValidationRules.utils.js";



export const signUpValidation = {
    body: Joi.object({
        firstName: Joi.string(),
        lastName: Joi.string(),
        username: Joi.string().optional(),
        email: general_Validation_Rules.mail.trim(),
        password: general_Validation_Rules.password.trim(),
        recoveryEmail: general_Validation_Rules.mail.trim(),
        DOB: Joi.date().less(new Date()),
        mobileNumber: general_Validation_Rules.mobileNumber.trim(),
        role: Joi.string().valid("user", "company_HR"),
        status: Joi.string().valid('online', 'offline').optional(),
        isConfirmed: Joi.boolean().optional(),
    }).options({ presence: "required" })
    , params: Joi.object({
        token: general_Validation_Rules.token
    }),
    headers: Joi.object({
        token: general_Validation_Rules.token,
        ...general_Validation_Rules.headers
    }),
}



export const verify_Mail_Validation = {
    params: Joi.object({
        token: general_Validation_Rules.token
    }),
}



export const SignIn_Validation = {
    body: Joi.object({
        email: general_Validation_Rules.mail.optional().trim(),
        password: general_Validation_Rules.password.required().trim(),
        recoveryEmail: general_Validation_Rules.mail.optional().trim(),
        mobileNumber: general_Validation_Rules.mobileNumber.optional().trim(),
    }).or('email', 'recoveryEmail', 'mobileNumber')


}
export const update_account_Validation = {
    body: Joi.object({
        email: general_Validation_Rules.mail.optional(),
        mobileNumber: general_Validation_Rules.mobileNumber.optional(),
        recoveryEmail: general_Validation_Rules.mail.optional(),
        DOB: Joi.date().less(new Date()).optional(),
        lastName: Joi.string().optional(),
        firstName: Joi.string().optional(),
    }).or('email', 'recoveryEmail', 'mobileNumber'),
    headers: Joi.object({
        token: general_Validation_Rules.token.required(),
        ...general_Validation_Rules.headers
    })
}



export const Delete_account_Validation = {
    params: Joi.object({
        id: general_Validation_Rules.ObjectId.required(),
    }),
    headers: Joi.object({
        token: general_Validation_Rules.token.required(),
        ...general_Validation_Rules.headers
    })
}



export const Get_user_Validation = {
    headers: Joi.object({
        token: general_Validation_Rules.token.required(),
        ...general_Validation_Rules.headers
    })
}



export const Get_another_user_Validation = {
    headers: Joi.object({
        token: general_Validation_Rules.token.required(),
        ...general_Validation_Rules.headers
    }),
    params: Joi.object({
        id: general_Validation_Rules.ObjectId.required()
    }),
    query: Joi.object({
        id: general_Validation_Rules.ObjectId.optional()
    }),
}




export const Update_Password_Validation = {
    headers: Joi.object({
        token: general_Validation_Rules.token.required(),
        ...general_Validation_Rules.headers
    }),
    body: Joi.object({
        password: general_Validation_Rules.password.required()
    }),
}


export const Forget_Password_sendOtp_Validation = {
    body: Joi.object({
        email: general_Validation_Rules.mail.optional(),
        mobileNumber: general_Validation_Rules.mobileNumber.optional(),
        recoveryEmail: general_Validation_Rules.mail.optional(),
    }).or("email", "recoveryEmail", "mobileNumber"),
}



export const Forget_Password_check_otp_Validation = {
    body: Joi.object({
        otp: Joi.string().required().min(4).max(4),
    })
}



export const Forget_Password_reset_password_Validation = {
    body: Joi.object({
        email: general_Validation_Rules.mail.optional(),
        mobileNumber: general_Validation_Rules.mobileNumber.optional(),
        password: general_Validation_Rules.password.required(),
    }).or("email", "mobileNumber")
}




export const Get_all_specific_recovery_Email_Validation = {
    body: Joi.object({
        recoveryEmail: general_Validation_Rules.mail.optional(),
    }),
    headers: Joi.object({
        token: general_Validation_Rules.token.required(),
        ...general_Validation_Rules.headers
    }),
}