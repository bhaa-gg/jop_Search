import { userModel } from "../../../DB/Models/User/user.models.js";
import { ErrorApp } from "../../Utils/ErrorApp.utils.js";

// Middleware function to check if a company HR exists in user models
export const company_HR_Exists = async (req, res, next) => {
    const { companyHR } = req.body;

    const find_companyHR = await userModel.findOne({ _id: companyHR })

    return find_companyHR ? next() :
        next(new ErrorApp("Couldn't find user", 404))
}