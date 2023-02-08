// Load dotenv over Deno.env
import { load } from "$std/dotenv/mod.ts";
import { cleanEnv, host, port, str, url } from "envalid";

const ENV = cleanEnv(await load(), {
  API_URL: url(),
  BASE_URL: url(),
  DENO_ENV: str({ choices: ["development", "testing", "production"] }),
  REDIS_PASS: str(),
  REDIS_HOST: host(),
  REDIS_PORT: port(),
});

export const {
  API_URL,
  BASE_URL,
  DENO_ENV,
  REDIS_HOST,
  REDIS_PASS,
  REDIS_PORT,
} = ENV;

export default ENV;
