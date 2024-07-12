import { applicationModel } from "../../../DB/Models/Application/applocation.models.js"



// add new  Application in database
export const new_Application = async (req, res, next) => {
    const { jobId, userId, userTechSkills, userSoftSkills, CompanyId } = req.body

    const Application = await applicationModel.create({ CompanyId, jobId, userId, userTechSkills, userSoftSkills })

    res.json({ message: 'success', Application })
}







