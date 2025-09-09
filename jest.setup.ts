console.log('✅ jest.setup.ts is running');
import "@testing-library/jest-dom";
import { fetch, Request, Response, Headers } from 'undici';
import { server } from './mocks/node';
import { getGlobalDispatcher } from "undici";

global.fetch = fetch as unknown as typeof global.fetch;
global.Request = Request as unknown as typeof global.Request;
global.Response = Response as unknown as typeof global.Response;
global.Headers = Headers as unknown as typeof global.Headers;

process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost:3000';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => {
    server.close()        
    getGlobalDispatcher().destroy();
    jest.clearAllTimers();
});
