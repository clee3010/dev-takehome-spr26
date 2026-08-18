import { connectDB } from "@/lib/db/mongoose";
import RequestModel from "@/lib/models/request";
import { RequestStatus} from "@/lib/types/request";
import { InvalidInputError, InvalidPaginationError } from "@/lib/errors/inputExceptions";
import { validateCreateItemRequest } from "@/lib/validation/requests";
import { PAGINATION_PAGE_SIZE } from "@/lib/constants/config";

export async function createNewRequest(request: unknown) {
    const validatedRequest = validateCreateItemRequest(request)
    
    if (!validatedRequest) {
        throw new InvalidInputError("item request");
    }

    await connectDB();

    const date = new Date();

    const newRequest = await RequestModel.create({
        requestorName: validatedRequest.requestorName,
        itemRequested: validatedRequest.itemRequested,
        requestCreatedDate: date,
        lastEditedDate: date,
        status: RequestStatus.PENDING,      
    });

    return newRequest;
}

export async function getItemRequests(page: number) {
    if (!Number.isInteger(page) || page < 1) {
        throw new InvalidPaginationError(page, PAGINATION_PAGE_SIZE);
    }

    await connectDB();

    const skip = (page - 1) * PAGINATION_PAGE_SIZE;

    const requests = await RequestModel.find()
        .sort({ requestCreatedDate: -1})
        .skip(skip)
        .limit(PAGINATION_PAGE_SIZE);
    
    return requests;
}