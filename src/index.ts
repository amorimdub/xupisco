import dotenv from "dotenv";
dotenv.config();

import Fastify, { FastifyInstance } from "fastify";

const start = async () => {
  const server: FastifyInstance = Fastify({ logger: true });
  server.get("/ping", async (request, reply) => {
    return { pong: "it worked!" };
  });
  try {
    await server.listen({ port: 3000 });
    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
