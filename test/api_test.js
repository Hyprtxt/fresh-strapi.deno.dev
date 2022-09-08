// import { assertEquals } from "$std/testing/asserts.ts";
// import { BASE_URL } from "@/utils/config.js";
// import { freshTestWrapper } from "@/test/runner.js";

// Deno.test(
//   "API Testing",
//   freshTestWrapper(async (t) => {
//     await t.step("The API sign-in route should work", async () => {
//       const data = new FormData();
//       data.set("identifier", "example@gmail.com");
//       data.set("password", "password");
//       const login = await fetch(`${BASE_URL}/api/signin`, {
//         method: "POST",
//         body: data,
//       }).then(async (res) => await res.json());
//       assertEquals(login.user.id, 83);
//       assertEquals(login.webview, true);
//       assertEquals(login.cart, []);
//     });
//   }),
// );
