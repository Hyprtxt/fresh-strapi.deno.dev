import Reset from "@/islands/Reset.jsx"
import { Layout } from "@/routes/index.jsx"
import { redirect } from "@/utils/mod.js"
import { BASE_URL } from "@/utils/config.js"

export const handler = {
  GET: (_req, ctx) => {
    const code = ctx.state.url.searchParams.get("code") || ""
    console.log(ctx.state.url, code, "yYESJS")
    return ctx.render({ ...ctx.state, code })
  },
  POST: async (req, ctx) => {
    const reset = await fetch(`${ctx.API_URL}/auth/reset-password`, {
      method: "POST",
      body: await req.formData(),
    }).then(async (res) => await res.json())
    console.log(reset, "reset stuff")
    return redirect(`${BASE_URL}/login`)
  },
}

const PageResetPassword = ({ data }) => {
  const { error, code } = data
  return (
    <Layout data={data}>
      <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full">
          <div>
            <img
              class="mx-auto h-12 w-auto"
              src="/logo.svg"
              alt="Workflow"
            />
            <h2 class="mt-6 mb-8 text-center text-3xl tracking-tight font-bold text-gray-900">
              Reset Your Password
            </h2>
            {error ? <p class="text-red-500">{error.message}</p> : ""}
          </div>
          <Reset code={code} />
        </div>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      </div>
    </Layout>
  )
}

export default PageResetPassword
