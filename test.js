import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

serve((_req) => {
    return new Response("Hello World!", {
        headers: { "content-type": "text/plain" },
    });
});

const reqHandler = async (req: Request) => {
    const filePath = new URL(req.url).pathname;
    return new Response(filePath);
};
serve(reqHandler, { port: 8080 });