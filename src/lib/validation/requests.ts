import { CreateItemRequest } from "@/lib/types/request";

function isValidString(
    value: unknown,
    lower?: number,
    upper?: number
): value is string {
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

export function validateCreateItemRequest(
    request: unknown
): CreateItemRequest | null {
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