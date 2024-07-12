import Joi from "joi";
import { general_Validation_Rules } from "../../Utils/ValidationRules.utils.js";

export const Add_Job_Validation = {
    body: Joi.object({
        jobTitle: Joi.string().required(),
        jobLocation: Joi.string().lowercase().valid("onsite", "remotely", "hybrid").required(),
        seniorityLevel: Joi.string().lowercase().valid("junior", "mid-Level", "senior", "team-Lead", "cto").required(),
        jobDescription: Joi.string().required(),
        addedBy: general_Validation_Rules.ObjectId.required(),
        companyId: general_Validation_Rules.ObjectId.required(),
        technicalSkills: general_Validation_Rules.arrayString.required(),
        softSkills: general_Validation_Rules.arrayString.required(),
    }),
    headers: Joi.object({
        token: general_Validation_Rules.token.required(),
        ...general_Validation_Rules.headers
    }),
}

export const Update_Job_Validation = {

    body: Joi.object({
        jobTitle: Joi.string().required(),
        jobLocation: Joi.string().lowercase().valid("onsite", "remotely", "hybrid").required(),
        seniorityLevel: Joi.string().lowercase().valid("junior", "mid-Level", "senior", "team-Lead", "cto").required(),
        jobDescription: Joi.string().required(),
        addedBy: general_Validation_Rules.ObjectId.required(),
        technicalSkills: general_Validation_Rules.arrayString.required(),
        softSkills: general_Validation_Rules.arrayString.required(),
    }),
    headers: Joi.object({
        token: general_Validation_Rules.token.required(),
        ...general_Validation_Rules.headers
    }),
    params: Joi.object({
        id: general_Validation_Rules.ObjectId.required(),
    }),
}

export const Delete_Job_Validation = {

    params: Joi.object({
        id: general_Validation_Rules.ObjectId.required(),
    }),
    headers: Joi.object({
        token: general_Validation_Rules.token.required(),
        ...general_Validation_Rules.headers
    }),
}

export const Jobs_with_company_Validation = {

    headers: Joi.object({
        token: general_Validation_Rules.token.required(),
        ...general_Validation_Rules.headers
    }),
}

export const all_Jobs_specific_company_Validation = {
    query: Joi.object({
        name: Joi.string().required(),
    }),
    headers: Joi.object({
        token: general_Validation_Rules.token.required(),
        ...general_Validation_Rules.headers
    }),
}

export const all_Jobs_With_filters_Validation = {
    body: Joi.object({
        jobLocation: Joi.string().optional(),
        seniorityLevel: Joi.string().optional(),
        jobTitle: Joi.string().optional(),
        technicalSkills: Joi.array().optional().items(Joi.string()),
    }),
    headers: Joi.object({
        token: general_Validation_Rules.token.required(),
        ...general_Validation_Rules.headers
    }),
} 