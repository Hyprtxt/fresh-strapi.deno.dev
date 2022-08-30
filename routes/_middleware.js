// routes/_middleware.js
import { cyan, green, yellow } from "$std/fmt/colors.ts";
import { getCookies, setCookie } from "$std/http/cookie.ts";
import {
  API_URL,
  DENO_ENV,
  REDIS_HOST,
  REDIS_PASS,
  REDIS_PORT,
} from "@/utils/config.js";
import * as redis from "redis";

const store = await redis.connect({
  password: REDIS_PASS,
  hostname: REDIS_HOST,
  port: REDIS_PORT,
});

const COOKIE_NAME = "uuid";
const REDIS_KEY = (uuid) => `sesh-${uuid}`;

// Session Tracker
const createSession = async () => {
  const session = {
    cart: [],
  };
  session[COOKIE_NAME] = crypto.randomUUID();
  await store.set(REDIS_KEY(session[COOKIE_NAME]), JSON.stringify(session));
  await store.expire(session[COOKIE_NAME], 7 * 24 * 60 * 60);
  return session;
};

const setupSession = async (req, ctx) => {
  const cookies = getCookies(req.headers);
  let key = REDIS_KEY(cookies[COOKIE_NAME]);
  if (key) {
    const session = await store.get(key);
    if (session) {
      ctx.state = JSON.parse(session);
    } else {
      key = false;
      ctx.state = await createSession();
    }
  } else {
    ctx.state = await createSession();
  }
  if (!key) {
    const resp = await ctx.next();
    setCookie(resp.headers, {
      name: COOKIE_NAME,
      value: ctx.state[COOKIE_NAME],
    });
    ctx.REDIS_KEY = REDIS_KEY(ctx.state[COOKIE_NAME]);
    return resp;
  } else {
    ctx.REDIS_KEY = key;
    return await ctx.next();
  }
};

export async function handler(req, ctx) {
  // Logging
  const start = Date.now();
  const { pathname } = new URL(req.url);
  const withSession = [
    "/",
    "/login",
    "/signup",
    "/logout",
    "/account",
  ];
  let resp;
  if (
    withSession.includes(pathname) ||
    pathname.startsWith("/login/") ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/account/")
  ) {
    ctx.API_URL = API_URL;
    ctx.DENO_ENV = DENO_ENV;
    ctx.store = store;
    resp = await setupSession(req, ctx);
  } else {
    resp = await ctx.next();
  }
  // Timing stuff - from oak
  const ms = Date.now() - start;
  resp.headers.set("X-Response-Time", `${ms}ms`);
  // console.log( ms, req )
  console.log(
    `${green(req.method)} ${cyan(pathname)} - ${yellow(String(ms) + "ms")}`,
  );
  return resp;
}
