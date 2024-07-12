import Joi from "joi";
import { general_Validation_Rules } from "../../Utils/ValidationRules.utils.js";

export const Add_company__Validation = {
    body: Joi.object({
        CompanyjopId: general_Validation_Rules.ObjectId.optional(),
        companyHR: general_Validation_Rules.ObjectId.required(),
        companyEmail: general_Validation_Rules.mail.required(),
        numberOfEmployees: general_Validation_Rules.numberOfEmployees.required(),
        companyName: Joi.string().required(),
        description: Joi.string().required(),
        industry: Joi.string().required(),
        address: Joi.string().required(),
    }),
    headers: Joi.object({
        token: general_Validation_Rules.token.required(),
        ...general_Validation_Rules.headers
    }),
}

export const Delete_company_Validation = {
    headers: Joi.object({
        token: general_Validation_Rules.token.required(),
        ...general_Validation_Rules.headers
    }),
}

export const Get_company_data_Validation = {
    params: Joi.object({
        id: general_Validation_Rules.ObjectId.required()
    }),
    headers: Joi.object({
        token: general_Validation_Rules.token.required(),
        ...general_Validation_Rules.headers
    }),
}

export const search_Company_Name_Validation = {
    query: Joi.object({
        name: Joi.string().required(),
    }),
    headers: Joi.object({
        token: general_Validation_Rules.token.required(),
        ...general_Validation_Rules.headers
    }),
}
export const applications_for_specific_Job_Validation = {
    params: Joi.object({
        id: general_Validation_Rules.ObjectId.required()
    }),
    headers: Joi.object({
        token: general_Validation_Rules.token.required(),
        ...general_Validation_Rules.headers
    }),
} 