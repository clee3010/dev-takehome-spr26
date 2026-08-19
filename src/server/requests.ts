import { connectDB } from "@/lib/db/mongoose";
import RequestModel from "@/lib/models/request";
import { RequestStatus} from "@/lib/types/request";
import { InvalidInputError, InvalidPaginationError } from "@/lib/errors/inputExceptions";
import { validateCreateItemRequest, validateEditStatusRequest, isValidStatus } from "@/lib/validation/requests";
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

export async function getItemRequests(status: string | null, page: number) {
    if (!Number.isInteger(page) || page < 1) {
        throw new InvalidPaginationError(page, PAGINATION_PAGE_SIZE);
    }

    if (status && !isValidStatus(status)) {
        throw new InvalidInputError("request status");
    }

    await connectDB();

    const skip = (page - 1) * PAGINATION_PAGE_SIZE;
    const filter = status ? { status } : {};

    const requests = await RequestModel.find(filter)
        .sort({ requestCreatedDate: -1})
        .skip(skip)
        .limit(PAGINATION_PAGE_SIZE);
    
    return requests;
}

export async function editStatusRequest(request : unknown) {
    const validatedRequest = validateEditStatusRequest(request);

    if (!validatedRequest) {
        throw new InvalidInputError("edit item request");
    }

    await connectDB();

    const editedRequest = await RequestModel.findByIdAndUpdate(
        validatedRequest.id,
        {
            status: validatedRequest.status,
            lastEditedDate: new Date(),
        },
        {
            new: true,
            runValidators: true,
        }
    );

    if (!editedRequest) {
        throw new InvalidInputError("item request ID");
    }

    return editedRequest;
}