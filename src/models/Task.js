import { Schema, model, models } from 'mongoose';

const taskSchema = new Schema(
    {
        title: {
            type: 'string',
            required: [true, 'el titulo es requerido'],
            unique: true,
            trim: true,
        },
        description: {
            type: 'string',
            required: [true, 'la descripcion es requerida'],
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

export default models.Task || model('Task', taskSchema);
