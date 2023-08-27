import Login from "@/islands/Login.jsx"
import { Layout } from "@/routes/index.jsx"
// import { asset, Head } from "$fresh/runtime.ts"
import { store } from "@/routes/_middleware.js"

export const handler = {
  GET: (_req, ctx) => {
    return ctx.render({ ...ctx.state })
  },
  POST: async (req, ctx) => {
    const login = await fetch(`${ctx.state.API_URL}/auth/local`, {
      method: "POST",
      body: await req.formData(),
    }).then(async (res) => await res.json())
    // console.log(login)
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

const PageLogin = (props) => {
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
              Sign in to your account
            </h2>
            {error ? <p class="text-red-500">{error.message}</p> : ""}
          </div>
          <Login />
          <LoginOAuth provider="github">Sign in with Github</LoginOAuth>
          <LoginOAuth provider="discord">Sign in with Discord</LoginOAuth>
          <LoginOAuth provider="facebook">Sign in with Facebook</LoginOAuth>
          <LoginOAuth provider="google">Sign in with Google</LoginOAuth>
        </div>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      </div>
    </Layout>
  )
}

export const LoginOAuth = ({ provider, children }) => (
  <a
    href={`/login/${provider}`}
    id={`login-${provider}`}
    class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300 mt-3"
  >
    <span class="absolute left-0 inset-y-0 flex items-center pl-3">
      <svg
        class="h-5 w-5 text-yellow-300 group-hover:text-yellow-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
          clip-rule="evenodd"
        />
      </svg>
    </span>
    {children}
  </a>
)

export default PageLogin
