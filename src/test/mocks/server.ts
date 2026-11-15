import { setupServer } from "msw/node";

// No default handlers used. The test declares server.use(...) and `onUnhandledRequest: "error"` catches requests
// a test forgot to handle for now.
export const server = setupServer();

export { http, HttpResponse, delay } from "msw";
