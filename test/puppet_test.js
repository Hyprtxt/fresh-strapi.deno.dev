import { assertEquals } from "$std/testing/asserts.ts"
import { freshPuppetTestWrapper } from "fresh_marionette"
import { BASE_URL, DENO_ENV } from "@/utils/config.js"

const puppet_config = DENO_ENV === "development"
  ? { headless: false, defaultViewport: null }
  : { headless: true }

Deno.test(
  "Public Pages Testing",
  freshPuppetTestWrapper(puppet_config, async (t, page) => {
    await t.step("The homepage should work", async () => {
      const response = await page.goto(`${BASE_URL}`, {
        waitUntil: "networkidle2",
      })
      assertEquals(response.status(), 200)
    })
    await t.step("The login page should 200", async () => {
      const response = await page.goto(`${BASE_URL}/login`, {
        waitUntil: "networkidle2",
      })
      assertEquals(response.status(), 200)
    })
    await t.step("The logout page should 200", async () => {
      const response = await page.goto(`${BASE_URL}/login`, {
        waitUntil: "networkidle2",
      })
      assertEquals(response.status(), 200)
    })
    await t.step("The forgot password page should 200", async () => {
      const response = await page.goto(`${BASE_URL}/forgot-password`, {
        waitUntil: "networkidle2",
      })
      assertEquals(response.status(), 200)
    })
    await t.step("The forgot password success page should 200", async () => {
      const response = await page.goto(`${BASE_URL}/forgot-password/success`, {
        waitUntil: "networkidle2",
      })
      assertEquals(response.status(), 200)
    })
    await t.step("The reset password page should 200", async () => {
      const response = await page.goto(`${BASE_URL}/reset-password`, {
        waitUntil: "networkidle2",
      })
      assertEquals(response.status(), 200)
    })
    await t.step("The account page should 401", async () => {
      // This is really a 301 to 401...
      const response = await page.goto(`${BASE_URL}/account`, {
        waitUntil: "networkidle2",
      })
      assertEquals(response.status(), 401)
    })
    await t.step("The error page should 404", async () => {
      const response = await page.goto(`${BASE_URL}/404`, {
        waitUntil: "networkidle2",
      })
      assertEquals(response.status(), 404)
    })
    await t.step("The unauthorized page should 401", async () => {
      const response = await page.goto(`${BASE_URL}/unauthorized`, {
        waitUntil: "networkidle2",
      })
      assertEquals(response.status(), 401)
    })
  }),
)
