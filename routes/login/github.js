import { redirect } from "@/utils/mod.js";

export const handler = {
  GET: (req, ctx) =>
    redirect(
      `${ctx.API_URL}/connect/github?callback=${
        new URL(req.url).origin + `/api/github/auth`
      }`,
    ),
};
