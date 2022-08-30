import { redirect } from "@/utils/mod.js";

export const handler = {
  GET: (req, ctx) => {
    const { provider } = ctx.params;
    return redirect(
      `${ctx.API_URL}/connect/${provider}?callback=${
        new URL(req.url).origin
      }/api/${provider}/auth`,
    );
  },
};
