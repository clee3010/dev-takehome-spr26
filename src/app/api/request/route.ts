import { ResponseType } from "@/lib/types/apiResponse";
import { ServerResponseBuilder } from "@/lib/builders/serverResponseBuilder";
import { InputException } from "@/lib/errors/inputExceptions";
import { createNewRequest } from "@/server/requests";

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