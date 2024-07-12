import { ErrorApp } from "../Utils/ErrorApp.utils.js"



export const catchErrors = (FN) => {
    return (req, res, next) => {
        FN(req, res, next).catch((err) => {
            return next(new ErrorApp(err.message, 500, err.stack))
        });
    };
};