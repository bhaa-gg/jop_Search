import { ObjectId, Types } from "mongoose";
import { CompanyModel } from "../../../DB/Models/Company/company.models.js"
import { ErrorApp } from "../../Utils/ErrorApp.utils.js"
import { jopModel } from './../../../DB/Models/Job/jop.models.js';
import { applicationModel } from "../../../DB/Models/Application/applocation.models.js";



// create a new company 
export const Add_company = async (req, res, next) => {
    const { companyName, description, industry, address
        , numberOfEmployees, companyEmail, companyHR } = req.body
    const company_Added = await CompanyModel.create({
        companyName,
        description,
        industry,
        address,
        numberOfEmployees,
        companyEmail,
        companyHR,
    })
    res.json({ message: "Success", company_Added })
}

// Update company
export const Update_company_data = async (req, res, next) => {
    const { companyName, description, industry, address
        , numberOfEmployees, companyEmail, companyHR } = req.body
    const company_Updated = await CompanyModel.findOneAndUpdate({ companyEmail }, {
        companyName,
        description,
        industry,
        address,
        numberOfEmployees,
        companyEmail,
        companyHR,
    }, {
        new: true
    })
    return company_Updated ? res.json({ message: "Update Success", company_Updated }) :
        next(new ErrorApp("Couldn't update company Check Your Mail", 400))

}

// Delete company
export const Delete_company = async (req, res, next) => {
    const company_Delete = await CompanyModel.findOneAndDelete({ companyHR: req.user._id })

    return company_Delete ? res.json({ message: "Delete Success", company_Delete }) :
        next(new ErrorApp("Couldn't Delete company ", 404))

}


// get company by id
export const Get_company_data = async (req, res, next) => {
    const { id } = req.params
    const company_Data = await CompanyModel.findById(id)
    if (!company_Data) return next(new ErrorApp("Couldn't find company", 404))

    const company_Jops = await jopModel.find({ addedBy: company_Data.companyHR })

    res.json({ message: "Success", company_Data, company_Jops })

}


// get company by name
export const search_Company_Name = async (req, res, next) => {
    const { name } = req.query
    const company = await CompanyModel.find({ companyName: name })

    return company.length ? res.json({ message: "Success", company }) :
        next(new ErrorApp("Couldn't Find company by this name ", 404))
}



export const applications_for_specific_Job = async (req, res, next) => {
    const { id } = req.params

    // find job by id and check the login user  he is addedBy
    const jop_id_with_company = await jopModel.findOne({ $and: [{ addedBy: req.user._id }, { _id: id }] })

    if (!jop_id_with_company) return next(new ErrorApp("Couldn't Find jop in company", 404))


    // get application by specific Job
    const applications = await applicationModel.find({ jobId: id }).select("-userId")

    return applications.length ? res.json({ message: "Success", applications }) :
        next(new ErrorApp("Couldn't Find Applications for this jop ", 404))
} 