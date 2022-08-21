// routes/account/_middleware.js

export async function handler(req, ctx) {
  // Logged in users only
  if( ctx.state.user ) {
    return await ctx.next();
  } else {
    return new Response('unauthorized, @todo: render a login', {
      status: 401
    })
  }
}