import PageLogin from "@/routes/login.jsx";

export const handler = {
  async GET(req, ctx) {
    if (ctx.state.user) {
      const state = ctx.state;
      delete state.user;
      delete state.jwt;
      await ctx.store.set(ctx.REDIS_KEY, JSON.stringify(state));
      ctx.state.error = { message: "Successfully logged out" };
    }
    return await ctx.render({
      ...ctx.state,
      url: new URL(req.url),
    });
  },
};

export default PageLogin;
