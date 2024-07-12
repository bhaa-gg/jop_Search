import { CompanyModel } from "../../../DB/Models/Company/company.models.js";
import { ErrorApp } from "../../Utils/ErrorApp.utils.js";





// Middleware to check if the HR id and company exists in the specified company
export const checkCompany_HrId_forJob = async (req, res, next) => {
    const { addedBy, companyId } = req.body;

    const hrIdCompany = await CompanyModel.findOne({ $and: [{ companyHR: addedBy }, { _id: companyId }] })

    return hrIdCompany ? next() : next(new ErrorApp("this Company Hr does not exist", 404));
}

// Middleware to check if the company exists in the database
export const checkCompany_Exists = async (req, res, next) => {
    const { companyId } = req.body;

    const Company = await CompanyModel.findOne({ companyId })

    return Company ? next() : next(new ErrorApp("this Company  does not exist", 404));
}

// Middleware to get the company by its name and attach it to the request object
export const get_Company_byName = async (req, res, next) => {
    const { name } = req.query;

    // get the company by its name
    const Company = await CompanyModel.findOne({ companyName: name })

    req.company = Company

    return Company ? next() : next(new ErrorApp("this Company  does not exist", 404));
} 