// Load dotenv over Deno.env
import { load } from "$std/dotenv/mod.ts"
import { cleanEnv, host, port, str, url } from "envalid"

// Loads stuff for deno.dev
const RAW_ENV = Object.assign(Deno.env.toObject(), await load())

const ENV = cleanEnv(RAW_ENV, {
  API_URL: url(),
  BASE_URL: url(),
  CURRENT_ENV: str({ choices: ["development", "testing", "production"] }),
  REDIS_PASS: str(),
  REDIS_HOST: host(),
  REDIS_PORT: port(),
})

export const {
  API_URL,
  BASE_URL,
  CURRENT_ENV,
  REDIS_HOST,
  REDIS_PASS,
  REDIS_PORT,
} = ENV

export default ENV
