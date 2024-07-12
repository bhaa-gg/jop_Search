
import { ErrorApp } from '../../Utils/ErrorApp.utils.js';
import { CompanyModel } from './../../../DB/Models/Company/company.models.js';


// Middleware to check if a company email exists in the database
export const company_Mail_Exists = async (req, res, next) => {
    const { companyEmail } = req.body

    const findMail = await CompanyModel.findOne({ companyEmail })

    return findMail ? next()
        : next(new ErrorApp("Email not found", 404))
}

// Middleware to check for duplicate company email in the database
export const Duplicate_company_Mail = async (req, res, next) => {
    const { companyEmail } = req.body

    const findMail = await CompanyModel.findOne({ companyEmail })

    return findMail ? next(new ErrorApp("Email Exists", 400)) : next()

}