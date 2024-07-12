import { ErrorApp } from "../Utils/ErrorApp.utils.js";

const reqKey = ["body", "params", "query", "headers"]

export const validationMiddleware = (schema) => {
    return async (req, res, next) => {
        let validationErrors = [];

        for (const key of reqKey) {
            let validationResult = schema[key]?.validate(req[key], { abortEarly: false });
            if (validationResult?.error) validationErrors.push(validationResult)
        }

        return validationErrors.length ? next(new ErrorApp(validationErrors, 300)) : next()
    }
}


