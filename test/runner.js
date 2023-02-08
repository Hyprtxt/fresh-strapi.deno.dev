import puppeteer from "puppeteer";
import { readLines } from "$std/io/read_lines.ts";
import { delay } from "$std/async/delay.ts";
import { DENO_ENV } from "@/utils/config.js";

const puppet_config = DENO_ENV === "development"
  ? { headless: false, defaultViewport: null }
  : { headless: true };

const startFresh = async () => {
  const serverProcess = Deno.run({
    cmd: ["deno", "run", "-A", "main.ts"],
    stdout: "piped",
    stderr: "inherit",
  });
  let started = false;
  for await (const line of readLines(serverProcess.stdout)) {
    console.log(line);
    if (line.includes("Listening on http://")) {
      started = true;
      break;
    }
  }
  if (!started) {
    throw new Error("Server didn't start up");
  }
  return serverProcess;
};

const stopFresh = (serverProcess) => {
  serverProcess.stdout.close();
  serverProcess.kill("SIGKILL");
  serverProcess.close();
  console.log("Fresh Stopped");
};

export const freshTestWrapper = (theTests) => async (t) => {
  const serverProcess = await startFresh();
  await theTests(t);
  stopFresh(serverProcess);
};

export const freshPuppetTestWrapper = (theTests) =>
  freshTestWrapper(async (t) => {
    const browser = await puppeteer.launch(puppet_config);
    const page = await browser.newPage();
    await delay(100);
    await theTests(t, page);
    await browser.close();
  });
