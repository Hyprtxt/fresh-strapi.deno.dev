// routes/api/[provider]/auth.js
import { redirect } from "@/utils/mod.js"
import { store } from "@/routes/_middleware.js"

export const handler = {
  GET: async (req, ctx) => {
    const provider = ctx.params.provider
    // console.log(provider, "auth.js");
    const url = new URL(req.url)
    const { search } = url
    console.log(ctx)
    const login = await fetch(
      `${ctx.state.API_URL}/auth/${provider}/callback${search}`,
    ).then(async (res) => {
      const body = await res.json()
      console.log(body, "yep")
      if (res.status !== 200) {
        return { unauthorized: true }
      }
      return body
    })
    // console.log("oauth login", login);
    const { user, jwt } = login
    const state = Object.assign(ctx.state, { user, jwt })
    const payload = JSON.stringify(state)
    return await store.set(ctx.state.REDIS_KEY, payload).then(
      () => redirect(`${ctx.state.BASE_URL}/account`),
    )
  },
}
