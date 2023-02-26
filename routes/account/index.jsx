import { Layout } from "@/routes/index.jsx"
import { API_URL } from "@/utils/config.js"

export const handler = {
	GET: async (_req, ctx) => {
		const me = await fetch(`${API_URL}/users/me`, {
			headers: new Headers({
				Authorization: `Bearer ${ctx.state.jwt}`,
			}),
		})
			.then(async (res) => await res.json())
		return ctx.render({ ...ctx.state, me })
	},
}

export default function PageAccount(props) {
	const { data } = props
	const { user } = data
	return (
		<Layout data={data}>
			<div id="account" class="p-4 mx-auto max-w-screen-md">
				<img
					src="/logo.svg"
					height="100px"
					alt="the fresh logo: a sliced lemon dripping with juice"
				/>
				<p class="my-6">
					Welcome to the users only section of this website
				</p>
				<pre>{JSON.stringify(user, null, 2 )}</pre>
			</div>
		</Layout>
	)
}
