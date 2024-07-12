import { applicationModel } from "../../../DB/Models/Application/applocation.models.js";
import { jopModel } from "../../../DB/Models/Job/jop.models.js";
import { ErrorApp } from "../../Utils/ErrorApp.utils.js";



export const Add_Job = async (req, res, next) => {
    const { companyId, jobTitle, jobLocation, seniorityLevel, jobDescription, technicalSkills, addedBy, softSkills } = req.body;

    const job = await jopModel.create({ companyId, jobTitle, jobLocation, seniorityLevel, jobDescription, technicalSkills, addedBy, softSkills });

    res.json({ message: 'success', job })

}

// update job by  job id
export const Update_Job = async (req, res, next) => {

    const { jobTitle, jobLocation, seniorityLevel, jobDescription, technicalSkills, addedBy, softSkills } = req.body;

    const { id } = req.params;

    const job_Updated = await jopModel.findOneAndUpdate({ _id: id }, { $set: { jobTitle, jobLocation, seniorityLevel, jobDescription, technicalSkills, companyId, addedBy, softSkills } }, { new: true });

    return job_Updated ? res.json({ message: 'update success', job_Updated }) :
        next(new ErrorApp('update failed this job not found', 404));
}


// delete a job by id
export const Delete_Job = async (req, res, next) => {
    const { id } = req.params;

    const job_Delete = await jopModel.findOneAndDelete({ _id: id }, { new: true });

    return job_Delete ? res.json({ message: 'delete success', job_Delete }) :
        next(new ErrorApp('this job not found', 404));
}

// get all jobs with  companies
export const Jobs_with_company = async (req, res, next) => {
    const job_Company = await jopModel.find().populate("companyId")

    res.json({ message: 'success', job_Company })

}
// get all jobs with  specific company
export const all_Jobs_specific_company = async (req, res, next) => {
    const job_specific_company = await jopModel.find({ addedBy: req?.company?.companyHR })

    res.json({ message: 'success', job_specific_company })
}

// ger jobs with filters
export const all_Jobs_With_filters = async (req, res, next) => {
    const { jobLocation, seniorityLevel, jobTitle, technicalSkills } = req.body

    const jobs = await jopModel.find({ $or: [{ jobLocation }, { seniorityLevel }, { jobTitle }, { technicalSkills: { $in: technicalSkills } }] })

    res.json({ message: 'success', jobs })
}
