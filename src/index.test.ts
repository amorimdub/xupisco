import dotenv from "dotenv";
dotenv.config();

import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { createClient } from "redis";

const client = createClient({
  url: process.env.REDIS_URL,
});
describe("REDIS", async () => {
  beforeAll(async () => {
    await client.connect();
  });
  beforeEach(async () => {
    await client.flushDb();
  });
  describe("JSON", async () => {
    it("SIMPLE SET / GET", async () => {
      const course = {
        course: "ru204",
        exercise: "1.2.1",
        status: "complete",
      };

      await client.json.set(
        "ru204:exercise:1.2.1",
        ".",
        JSON.stringify(course)
      );
      const result = await client.json.get("ru204:exercise:1.2.1", {
        path: ".",
      });
      const parsed = JSON.parse(result as string);

      expect(course.course).toBe(parsed.course);
    });

    afterAll(async () => {
      await client.disconnect();
    });
  });
});
