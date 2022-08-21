export const handler = {
  async GET(req, ctx) {
    if (ctx.state?.user?.id) {
      const state = ctx.state;
      delete state.user;
      delete state.jwt;
      await ctx.store.set(ctx.REDIS_KEY, JSON.stringify(state));
      return new Response(null, {
        status: 302,
        headers: new Headers({
          location: new URL(req.url).origin + `/`,
        }),
      });
    } else {
      // They were not logged in?
      return new Response(null, {
        headers: {
          "Location": "/login",
        },
        status: 302,
      });
    }
  },
};
