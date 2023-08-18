import { redirect } from "@/utils/mod.js"

export const handler = {
  GET: (_req, ctx) => {
    console.log(ctx, "THATHTlkasfdjlkj")
    const { provider } = ctx.params
    return redirect(
      `${ctx.state.API_URL}/connect/${provider}?callback=${ctx.state.BASE_URL}/api/${provider}/auth`,
    )
  },
}
