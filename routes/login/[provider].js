import { redirect } from "@/utils/mod.js"

export const handler = {
	GET: (_req, ctx) => {
		const { provider } = ctx.params
		return redirect(
			`${ctx.API_URL}/connect/${provider}?callback=${ctx.BASE_URL}/api/${provider}/auth`,
		)
	},
}
