import { CreateItemRequest, EditStatusRequest, RequestStatus } from "@/lib/types/request";
import mongoose from "mongoose";

function isValidString( value: unknown, lower?: number, upper?: number): value is string {
    if (typeof value !== "string" || value.trim() === "") {
        return false;
    }

    if ((lower && value.length < lower) || (upper && value.length > upper)) {
        return false;
    }

    return true;
}

function isValidName(name : unknown): name is string {
    return isValidString(name, 3, 30);
}

function isValidItemRequested(item : unknown): item is string {
    return isValidString(item, 2, 100);
}

export function isValidStatus(status: unknown): status is RequestStatus {
    return (
        typeof status === "string" && Object.values(RequestStatus).includes(status as RequestStatus)
    );
}

export function validateCreateItemRequest(request: unknown): CreateItemRequest | null {
    if (typeof request !== "object" || request === null) {
        return null;
    }

    const candidate = request as Record<string, unknown>;

    if (!isValidName(candidate.requestorName) || !isValidItemRequested(candidate.itemRequested) )
    {
        return null;
    }

    return {
        requestorName: candidate.requestorName,
        itemRequested: candidate.itemRequested,
    };
}

export function validateEditStatusRequest(request: unknown): EditStatusRequest | null {
    if (typeof request !== "object" || request === null) {
        return null;
    }

    const candidate = request as Record<string, unknown>;

    if (typeof candidate.id !== "string" || !mongoose.Types.ObjectId.isValid(candidate.id) || !isValidStatus(candidate.status)) {
        return null;
    }

    return {
        id: candidate.id,
        status: candidate.status
    };
}

