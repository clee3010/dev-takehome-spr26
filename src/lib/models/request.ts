import mongoose, { Schema } from "mongoose";
import { RequestStatus } from '@/lib/types/request';

const requestSchema = new Schema({
    requestorName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
    },

    itemRequested: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
    },

    requestCreatedDate: {
        type: Date,
        required: true,
    },

    lastEditedDate: {
        type: Date,
        required: false,
    },

    status: {
        type: String,
        enum: Object.values(RequestStatus),
        required: true,
    },

});

const RequestModel = 
    mongoose.models.Request || mongoose.model("Request", requestSchema);

export default RequestModel;