// routes/account/_middleware.js
import { redirect } from "@/utils/mod.js"
import { BASE_URL } from "@/utils/config.js"

export async function handler(_req, ctx) {
	// Logged in users only
	if (ctx.state.user) {
		return await ctx.next()
	}
	return redirect(`${BASE_URL}/unauthorized`)
}
