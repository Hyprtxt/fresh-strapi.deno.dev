// Load dotenv over Deno.env
import { config } from "$std/dotenv/mod.ts";
export const env = Object.assign(Deno.env.toObject(), await config());
