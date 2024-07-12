import { model, Schema } from "mongoose";
import { modelsSchema } from "../../../src/Utils/modelSchema.utils.js";



const applicationSchema = new Schema({
    jobId: {
        type: Schema.Types.ObjectId,
        ref: "jop",
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    userTechSkills: {
        type: [String],
        required: true
    },
    userSoftSkills: {
        type: [String],
        required: true
    },
    userResume: {
        type: String,
    },
}, {
    ...modelsSchema
})


export const applicationModel = model("applications", applicationSchema)
