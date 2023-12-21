import mongoose, { Schema, model } from "mongoose"

const PatientSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    fehca: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    symptoms: {
        type: String,
        required: true,
    },
    vet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VetModel'
    },
}, {
    timestamps: true,
})

export const PatientModel = model('patient', PatientSchema, 'patients');