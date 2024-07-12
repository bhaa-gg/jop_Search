import { modelsSchema } from "../../../src/Utils/modelSchema.utils.js";
import { Schema, Types, model } from "mongoose";



const CompanySchema = new Schema({
    companyName: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    industry: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    numberOfEmployees: {
        type: Number,
        required: true,
        min: 10,
        max: 20,
    },
    companyEmail: {
        type: String,
        unique: true,
        required: true,
    },
    companyHR: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
}, {
    ...modelsSchema
});


export const CompanyModel = model("Company", CompanySchema)