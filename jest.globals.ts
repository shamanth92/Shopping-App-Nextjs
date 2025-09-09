import { TextEncoder, TextDecoder } from 'util';
import { ReadableStream, WritableStream, TransformStream } from 'web-streams-polyfill';
import { MessageChannel, MessagePort } from 'worker_threads';

// ✅ Polyfill Web Streams
globalThis.ReadableStream = ReadableStream as unknown as typeof globalThis.ReadableStream;
globalThis.WritableStream = WritableStream as unknown as typeof globalThis.WritableStream;
globalThis.TransformStream = TransformStream as unknown as typeof globalThis.TransformStream;

// ✅ Polyfill TextEncoder/Decoder
globalThis.TextEncoder = TextEncoder as unknown as typeof globalThis.TextEncoder;
globalThis.TextDecoder = TextDecoder as unknown as typeof globalThis.TextDecoder;

// ✅ Polyfill MessageChannel/MessagePort
globalThis.MessageChannel = MessageChannel as unknown as typeof globalThis.MessageChannel;
globalThis.MessagePort = MessagePort as unknown as typeof globalThis.MessagePort;
