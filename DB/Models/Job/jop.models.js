import { model, Schema } from "mongoose";
import { modelsSchema } from "../../../src/Utils/modelSchema.utils.js";



const jopSchema = new Schema({
    jobTitle: {
        type: String,
        required: true,
    },
    jobLocation: {
        type: String,
        required: true,
        enum: ["onsite", "remotely", "hybrid"]
    },
    seniorityLevel: {
        type: String,
        required: true,
        enum: ["junior", "mid-Level", "senior", "team-Lead", "CTO"]
    },
    jobDescription: {
        type: String,
        required: true,
    },
    technicalSkills: {
        type: [String],
        required: true,
    },
    softSkills: {
        type: [String],
        required: true,
    },
    addedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    companyId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Company"
    },

}, {
    ...modelsSchema
})



export const jopModel = model("jop", jopSchema)