import {Schema, model} from 'mongoose';

const tasksSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true
    },
    priority: {
        type: String,
        required: true,
        isEnum: ['Baja', 'Media', 'Alta']
    },
    date: {
        type: Date,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
}, {
    timestamps: true
});

export default model('Tasks', tasksSchema);