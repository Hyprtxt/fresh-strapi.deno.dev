import { Layout } from "@/routes/index.jsx"

export const handler = {
  GET: async (req, ctx) => {
    const url = new URL(req.url)
    // ctx.state.url = url
    const resp = await ctx.render({ ...ctx.state })
    return new Response(resp.body, {
      headers: resp.headers,
      status: 401,
    })
  },
}

export default function Page401(props) {
  return (
    <Layout data={props}>
      <div class="p-4 mx-auto max-w-screen-md">
        <h1 class="text-red text-4xl">401 Unauthorized</h1>
        <p class="my-6">
          That's an error, Whoops!
        </p>
        <p class="my-6">
          Try <a href="/login">logging</a> in?
        </p>
      </div>
    </Layout>
  )
}
