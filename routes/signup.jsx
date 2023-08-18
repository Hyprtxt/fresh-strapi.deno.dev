import Signup from "@/islands/Signup.jsx"
import { Layout } from "@/routes/index.jsx"
import { LoginOAuth } from "@/routes/login/index.jsx"
import { store } from "@/routes/_middleware.js"

export const handler = {
  GET: (_req, ctx) => {
    return ctx.render({ ...ctx.state })
  },
  POST: async (req, ctx) => {
    const body = await req.formData()
    // console.log(body, 'signup submit');
    const login = await fetch(`${ctx.state.API_URL}/auth/local/register`, {
      method: "POST",
      body,
    }).then(async (res) => await res.json())
    // Redirect if we got a login success, else render the form with an error
    if (login.error) {
      return ctx.render({ ...ctx.state, error: login.error })
    } else {
      const { user, jwt } = login
      // Put the login into the redis store
      const state = Object.assign(ctx.state, { user, jwt, webview: false })
      return await store.set(ctx.state.REDIS_KEY, JSON.stringify(state))
        .then(
          () => {
            // Redirect. Next request will get the session from it's cookie
            const res = new Response(null, {
              status: 302,
              headers: new Headers({
                location: ctx.state.BASE_URL + `/account`,
              }),
            })
            return res
          },
        )
    }
  },
}

const PageSignup = (props) => {
  const { data } = props
  const { error } = data
  return (
    <Layout data={props}>
      <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full">
          <div>
            <img
              class="mx-auto h-12 w-auto"
              src="/logo.svg"
              alt="Workflow"
            />
            <h2 class="mt-6 mb-8 text-center text-3xl tracking-tight font-bold text-gray-900">
              Create an account
            </h2>
            {error ? <p class="text-red-500">{error.message}</p> : ""}
          </div>
          <Signup />
          <LoginOAuth provider="github">Signup with Github</LoginOAuth>
          <LoginOAuth provider="discord">Signup with Discord</LoginOAuth>
          <LoginOAuth provider="facebook">Signup with Facebook</LoginOAuth>
          <LoginOAuth provider="google">Signup with Google</LoginOAuth>
        </div>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      </div>
    </Layout>
  )
}

export default PageSignup
