// routes/account/_middleware.js

export async function handler(_req, ctx) {
  // Logged in users only
  if (ctx.state.user) {
    return await ctx.next();
  } else {
    ctx.state.unauthorized = true;
    ctx.state.error = { message: "Not Authorized, please login" };
    return await ctx.next();
  }
}
