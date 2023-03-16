import dotenv from "dotenv";
dotenv.config();

import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import { createClient } from "redis";

const client = createClient({
  url: process.env.REDIS_URL,
});
client.on("error", (err) => console.log("Redis Client Error", err));

const start = async () => {
  const server: FastifyInstance = Fastify({ logger: true });
  server.get("/ping", async (request, reply) => {
    const value = await client.get("key");
    return { pong: "it worked!", value };
  });
  try {
    await client.connect();

    await server.listen({ port: 3000 });

    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
