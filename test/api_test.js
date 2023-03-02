import { assertEquals } from "$std/testing/asserts.ts"
import { freshTestWrapper } from "fresh_marionette"
import { BASE_URL } from "@/utils/config.js"

Deno.test(
  "API Testing",
  freshTestWrapper(async (t) => {
    await t.step("The API sign-in route should work", () => {
      const url = new URL("./foo.js", BASE_URL)
      assertEquals(url.href, `${BASE_URL}/foo.js`)
    })
  }),
)
