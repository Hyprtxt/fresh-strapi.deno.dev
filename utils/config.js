// Load dotenv over Deno.env
import { config } from "$std/dotenv/mod.ts";
const env = Object.assign(Deno.env.toObject(), await config());

export const {
  API_URL,
  BASE_URL,
  DENO_ENV,
  REDIS_HOST,
  REDIS_PASS,
  REDIS_PORT,
} = env;

export default env;
