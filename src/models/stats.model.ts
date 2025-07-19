import mongoose, { Schema } from "mongoose";
import { IStats } from "@/types";

const statsSchema = new Schema<IStats>(
    {
        screenshots: {
            type: Number,
            default: 0,
            required: true,
        },
    },
    { timestamps: true }
);

export const Stats =
    (mongoose.models.Stats as mongoose.Model<IStats>) ||
    mongoose.model<IStats>("Stats", statsSchema);
