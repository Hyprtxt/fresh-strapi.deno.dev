import { assertEquals } from "$std/testing/asserts.ts";
import { freshPuppetTestWrapper } from "@/test/runner.js";
import { BASE_URL } from "@/utils/config.js";

Deno.test(
  "Manager Pages Testing",
  freshPuppetTestWrapper(async (t, page) => {
    await t.step("The homepage should work", async () => {
      const response = await page.goto(`${BASE_URL}`, {
        waitUntil: "networkidle2",
      });
      assertEquals(response.status(), 200);
    });
  }),
);
