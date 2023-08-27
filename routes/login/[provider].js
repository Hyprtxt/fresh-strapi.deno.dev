import { redirect } from "@/utils/mod.js"
import { API_URL, BASE_URL } from "@/utils/config.js"

export const handler = {
  GET: (_req, ctx) => {
    const { provider } = ctx.params
    // Todo something to check provider param
    // github, facebook, google, discord
    return redirect(
      `${API_URL}/connect/${provider}?callback=${BASE_URL}/api/${provider}/auth`,
    )
  },
}
