// routes/api/[provider]/auth.js
import { redirect } from "@/utils/mod.js";

export const handler = {
  GET: async (req, ctx) => {
    const provider = ctx.params.provider;
    console.log(provider, "auth.js");
    const url = new URL(req.url);
    const login = await fetch(
      `${ctx.API_URL}/auth/${provider}/callback${url.search}`,
    ).then(async (res) => {
      if (res.status !== 200) {
        return { unauthorized: true };
      }
      return await res.json();
    });
    const { user, jwt } = login;
    const state = Object.assign(ctx.state, { user, jwt });
    const payload = JSON.stringify(state);
    return await ctx.store.set(ctx.REDIS_KEY, payload).then(
      () => redirect(url.origin + `/`),
    );
  },
};
