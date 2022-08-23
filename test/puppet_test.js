import { assertEquals } from "$std/testing/asserts.ts";
import puppeteer from "puppeteer";
import { DENO_ENV } from "@/config.js";

const URL = DENO_ENV === "development"
  ? "http://localhost:8000"
  : "https://fresh-strapi.deno.dev";

const headless = DENO_ENV === "development" ? false : true;

const browser = await puppeteer.launch({ headless });

const page = await browser.newPage();

Deno.test("The homepage should 200", async () => {
  const response = await page.goto(`${URL}`, {
    waitUntil: "networkidle2",
  });
  assertEquals(response.status(), 200);
});

Deno.test("The signup should 200", async () => {
  const response = await page.goto(`${URL}/signup`, {
    waitUntil: "networkidle2",
  });
  assertEquals(response.status(), 200);
});

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

Deno.test("The account page should 401", async () => {
  const response = await page.goto(`${URL}/account`, {
    waitUntil: "networkidle2",
  });
  assertEquals(response.status(), 401);
});

Deno.test("The login page should 200", async () => {
  const response = await page.goto(`${URL}/login`, {
    waitUntil: "networkidle2",
  });
  assertEquals(response.status(), 200);
});

Deno.test("The logout page should 200", async () => {
  const response = await page.goto(`${URL}/logout`, {
    waitUntil: "networkidle2",
  });
  // Why not 301?
  assertEquals(response.status(), 200);
});

Deno.test("The login page should allow login", async () => {
  // const response =
  await page.goto(`${URL}/login`, {
    waitUntil: "networkidle2",
  });
  await page.waitForSelector("#identifier");
  await page.focus("#identifier");
  await page.type("#identifier", "taylor@videopoker.academy");
  await page.focus("#password");
  await page.type("#password", "500707a5-92d4-4c9d-9c22-3d9ac8e7afa7");
  await page.focus("#login-submit");
  await page.click("#login-submit");
  await page.waitForSelector("#account");
  const url = await page.url();
  assertEquals(url, `${URL}/account`);
});

Deno.test("The account page should 200", async () => {
  const response = await page.goto(`${URL}/account`, {
    waitUntil: "networkidle2",
  });
  assertEquals(response.status(), 200);
});

Deno.test("The logout page should 200", async () => {
  const response = await page.goto(`${URL}/logout`, {
    waitUntil: "networkidle2",
  });
  assertEquals(response.status(), 200);
});

Deno.test("The account page should 401", async () => {
  const response = await page.goto(`${URL}/account`, {
    waitUntil: "networkidle2",
  });
  assertEquals(response.status(), 401);
});
