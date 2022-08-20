import { assertEquals } from "https://deno.land/std@0.148.0/testing/asserts.ts";
import puppeteer from "https://deno.land/x/puppeteer@14.1.1/mod.ts";

const URL = "https://test-marionette.deno.dev";

const headless = !Deno.env.get("PRODUCTION");

const browser = await puppeteer.launch({ headless });

const page = await browser.newPage();

Deno.test("The homepage should 200", async () => {
  const response = await page.goto(`${URL}`, {
    waitUntil: "networkidle2",
  });
  assertEquals(response.status(), 200);
});

// Deno.test("The Homepage shold show a link to the product page", async () => {
//   const exists = !! await page.$("#primary-navigation a.btn");
//   assertEquals(exists, true);
// })

Deno.test("The jokes api should 200", async () => {
  const response = await page.goto(`${URL}/api/joke`, {
    waitUntil: "networkidle2",
  });
  assertEquals(response.status(), 200);
});

Deno.test("The 404 page should 404", async () => {
  const response = await page.goto(`${URL}/404`, {
    waitUntil: "networkidle2",
  });
  assertEquals(response.status(), 404);
});
