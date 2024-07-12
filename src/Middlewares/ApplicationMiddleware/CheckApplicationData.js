import { applicationModel } from "../../../DB/Models/Application/applocation.models.js";
import { jopModel } from "../../../DB/Models/Job/jop.models.js"
import { ErrorApp } from "../../Utils/ErrorApp.utils.js";


// Middleware to check if a job exists by jobId
export const check_jobId = async (req, res, next) => {
    const { jobId } = req.body

    const find_Jop = await jopModel.findById(jobId);

    return find_Jop ? next() :
        next(new ErrorApp("Job not found", 404));
}

// Middleware to check if a user is already associated with a job
export const check_job_With_User = async (req, res, next) => {
    const { jobId, userId } = req.body

    const find_Jop_With_User = await applicationModel.findOne({ $and: [{ userId }, { jobId }] });

    return find_Jop_With_User ?
        next(new ErrorApp("This user already in this job", 400)) : next()
}