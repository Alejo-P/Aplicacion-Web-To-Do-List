import { Schema, model } from "mongoose";

const usersSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Boolean,
        default: true
    },
    token: {
        type: String,
        default: '',
    }
}, {
    timestamps: true
});

export default model('Users', usersSchema);