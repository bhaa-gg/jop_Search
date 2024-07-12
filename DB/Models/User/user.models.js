import { model, Schema } from "mongoose";
import { modelsSchema } from './../../../src/Utils/modelSchema.utils.js';




//mongodb+srv://Bahaa_Wafy:Bhaa_Wafy@cluster0.jm99k54.mongodb.net/


const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    recoveryEmail: {
        type: String,
        trim: true,
    },
    DOB: {
        type: Date,
        required: true,
    },
    mobileNumber: {
        type: String,
        unique: true,
        required: true,
        trim: true,

    },
    role: {
        type: String,
        required: true,
        enum: ["user", "company_HR"],
    },
    isConfirmed: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ['online', 'offline'],
        default: "offline"
    },
    otpCode: {
        type: String,
        required: false,
        default: "unknown",
        select: false
    },
    otpExpire: {
        type: Date,
        required: false,
        default: new Date("2000-01-01"),
        select: false
    }

}, {
    ...modelsSchema
})

export const userModel = model("User", userSchema); 