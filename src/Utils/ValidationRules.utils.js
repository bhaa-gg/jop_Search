import { Types } from "mongoose"
import Joi from "joi"


const idValidate = (val, helper) => {
    return Types.ObjectId.isValid(val) ? val : helper("id must be valid");
}


export const general_Validation_Rules = {
    ObjectId: Joi.string().custom(idValidate),
    headers: {
        "content-type": Joi.string().optional(),
        "user-agent": Joi.string().optional(),
        accept: Joi.string().optional(),
        "postman-token": Joi.string().optional(),
        host: Joi.string().optional(),
        "accept-encoding": Joi.string().optional(),
        connection: Joi.string().optional(),
        "content-length": Joi.string().optional(),
    },
    mail: Joi.string().email({
        tlds: { allow: ["bhaa", "com", "net", "org"] },
        // minDomainSegments: 1,
        // maxDomainSegments: 1,
    }),
    mobileNumber: Joi.string().regex(/^(010|011|012|015)[0-9]{8}$/),
    token: Joi.string(),
    password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$!%*?&])[A-Za-z\d$!%*?&]{8,}$/),
    numberOfEmployees: Joi.number().integer().min(10).max(20),
    arrayString: Joi.array().items(Joi.string()),
}