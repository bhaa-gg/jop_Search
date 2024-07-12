import Joi from "joi";
import { general_Validation_Rules } from "../../Utils/ValidationRules.utils.js";




export const new_Application_Validation = {
    body: Joi.object({
        jobId: general_Validation_Rules.ObjectId.required(),
        userId: general_Validation_Rules.ObjectId.required(),
        userTechSkills: Joi.array().items(Joi.string()).required(),
        userSoftSkills: Joi.array().items(Joi.string()).required(),
        userResume: Joi.string().optional(),
    }),
    headers: Joi.object({
        token: general_Validation_Rules.token.required(),
        ...general_Validation_Rules.headers
    }),
} 