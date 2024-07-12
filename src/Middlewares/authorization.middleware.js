import { ErrorApp } from "../Utils/ErrorApp.utils.js"




export const authorizationMiddleware = (allowedRules) => {
    return async (req, res, next) => {
        return allowedRules.includes(req.user.role) ? next() :
            next(new ErrorApp("Authorization Error", 401))
    }
}