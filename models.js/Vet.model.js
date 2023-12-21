import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs'
import generateId from "../helpers/generateId.js";



const vetSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    phone: {
        type: String,
        default: null,
        trim: true,
    },
    web: {
        type: String,
        default: null,
    },
    token: {
        type: String,
        default:generateId(),
    },
    confirm: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

//para encryptar o hashear la contraseña

vetSchema.pre("save", async function(next) {
    if(!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

//para comparar la contraseña

vetSchema.methods.confirmPassword = async function (passwordForm  ) {
    return await bcrypt.compare(passwordForm, this.password)
}


export const VetModel = model('vet', vetSchema, 'vets')