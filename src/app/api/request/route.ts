import { ResponseType } from "@/lib/types/apiResponse";
import { ServerResponseBuilder } from "@/lib/builders/serverResponseBuilder";
import { InputException } from "@/lib/errors/inputExceptions";
import { createNewRequest, getItemRequests } from "@/server/requests";

export async function PUT(request: Request) {
    try {
        const req = await request.json();

        const newRequest = await createNewRequest(req);

        return new Response(JSON.stringify(newRequest), {
            status: 201,
            headers: { "Content-Type" : "application/json"},
        });

    } catch (e) {

        if (e instanceof InputException) {
            return new ServerResponseBuilder(ResponseType.INVALID_INPUT).build();
        }

        return new ServerResponseBuilder(ResponseType.UNKNOWN_ERROR).build();
        
    }
}

export async function GET(request: Request) {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");

    try {
        const requests = await getItemRequests(page);

        return new Response(JSON.stringify(requests), {
            status: 200,
            headers: { "Content-Type": "application/json"},
        });

    } catch (e) {

        if (e instanceof InputException) {
            return new ServerResponseBuilder(ResponseType.INVALID_INPUT).build();
        }

        return new ServerResponseBuilder(ResponseType.UNKNOWN_ERROR).build();
    }
}