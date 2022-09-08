// routes/_middleware.js
import { blue, cyan, green, magenta, red, yellow } from "$std/fmt/colors.ts";
import { getCookies, setCookie } from "$std/http/cookie.ts";
import * as redis from "redis";
import {
  API_URL,
  BASE_URL,
  DENO_ENV,
  REDIS_HOST,
  REDIS_PASS,
  REDIS_PORT,
} from "@/utils/config.js";

const store = await redis.connect({
  password: REDIS_PASS,
  hostname: REDIS_HOST,
  port: REDIS_PORT,
});

const COOKIE_NAME = "uuid";
const REDIS_KEY = (COOKIE_VALUE) => `sesh-${COOKIE_VALUE}`;

// Session Tracker
const createSession = async () => {
  const session = {
    cart: [],
  };
  session[COOKIE_NAME] = crypto.randomUUID();
  await store.set(REDIS_KEY(session[COOKIE_NAME]), JSON.stringify(session));
  await store.expire(REDIS_KEY(session[COOKIE_NAME]), 7 * 24 * 60 * 60);
  return session;
};

const setupNewSession = async (req, ctx) => {
  ctx.state = await createSession();
  ctx.REDIS_KEY = REDIS_KEY(ctx.state[COOKIE_NAME]);
  setupState(req, ctx);
  const resp = await ctx.next();
  setCookie(resp.headers, {
    name: COOKIE_NAME,
    value: ctx.state[COOKIE_NAME],
    path: "/",
  });
  return resp;
};

const setupSession = async (req, ctx) => {
  const cookies = getCookies(req.headers);
  if (cookies[COOKIE_NAME]) {
    const session = await store.get(REDIS_KEY(cookies[COOKIE_NAME]));
    if (session) {
      ctx.state = JSON.parse(session);
      ctx.REDIS_KEY = REDIS_KEY(cookies[COOKIE_NAME]);
    } else {
      return await setupNewSession(req, ctx);
    }
  } else {
    return await setupNewSession(req, ctx);
  }
  setupState(req, ctx);
  return await ctx.next();
};

const setupState = (req, ctx) => {
  // req.url.replace("http:", "https:");
  const url = new URL(req.url);
  ctx.state.url = url;
};

export async function handler(req, ctx) {
  // For Logging
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
    ctx.BASE_URL = BASE_URL;
    ctx.DENO_ENV = DENO_ENV;
    ctx.store = store;
    resp = await setupSession(req, ctx);
  } else {
    resp = await ctx.next();
  }
  const now = Date.now();
  const ms = now - start;
  const status = () => {
    const str = resp.status.toString();
    if (str[0] === "2") {
      return green(str);
    }
    if (str[0] === "3") {
      return yellow(str);
    } else {
      return red(str);
    }
  };
  resp.headers.set("X-Response-Time", `${ms}ms`);
  console.log(
    `[${magenta(new Date(now).toISOString())}] ${blue(req.method)} ${
      cyan(pathname)
    } - ${blue(String(ms) + "ms")} - ${status()}`,
  );
  return resp;
}
