import { connectDB } from "@/lib/db/mongoose";
import RequestModel from "@/lib/models/request";
import { RequestStatus} from "@/lib/types/request";
import { InvalidInputError } from "@/lib/errors/inputExceptions";
import { validateCreateItemRequest } from "@/lib/validation/requests";

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