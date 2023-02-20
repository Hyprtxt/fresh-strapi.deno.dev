import { Layout } from "@/routes/index.jsx"

export const handler = {
  GET: async (_req, ctx) => {
    return await ctx.render({
      ...ctx.state,
    })
  },
}

export default function PageAccount(props) {
  const { data } = props
  return (
    <Layout data={data}>
      <div id="account" class="p-4 mx-auto max-w-screen-md">
        <img
          src="/logo.svg"
          height="100px"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />
        <p class="my-6">
          Success, if we have a match for that email address, your password
          reset link has been sent.
        </p>
      </div>
    </Layout>
  )
}
