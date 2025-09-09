import { TextEncoder, TextDecoder } from "util";

(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder as any;

if (!(global as any).ReadableStream) {
  try {
    const { ReadableStream } = require("stream/web");
    (global as any).ReadableStream = ReadableStream;
  } catch {
    console.warn("⚠️ ReadableStream is not available in this Node version");
  }
}

import { MessageChannel, MessagePort, Worker } from "worker_threads";

// Polyfill Worker APIs if missing
if (!(global as any).MessageChannel) {
  (global as any).MessageChannel = MessageChannel;
}
if (!(global as any).MessagePort) {
  (global as any).MessagePort = MessagePort;
}
if (!(global as any).Worker) {
  (global as any).Worker = Worker;
}