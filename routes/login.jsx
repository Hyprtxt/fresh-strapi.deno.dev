/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import Login from "@/islands/Login.jsx";

export const handler = {
  GET: (req, ctx) => {
    return ctx.render({ url: req.url });
  },
  POST: async (req, ctx) => {
    const login = await fetch(`${ctx.API_URL}/auth/local`, {
      method: "POST",
      body: await req.formData(),
    }).then(async (res) => await res.json());
    console.log(login);
    // Redirect if we got a login success, else render the form with an error
    if (login.error) {
      return ctx.render({ ...ctx.state, error: login.error, url: req.url });
    } else {
      const { user, jwt } = login;
      // Put the login into the redis store
      const state = Object.assign(ctx.state, { user, jwt, webview: false });
      return await ctx.store.set(ctx.REDIS_KEY, JSON.stringify(state)).then(
        () => {
          // Redirect. Next request will get the session from it's cookie
          const res = new Response(null, {
            status: 302,
            headers: new Headers({
              location: new URL(req.url).origin + `/account`,
            }),
          });
          return res;
        },
      );
    }
  },
};

export default function PageHome({ data }) {
  const { CSS, readme } = data;
  return (
    <div
      class={tw`min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8`}
    >
      <div class={tw`max-w-md w-full space-y-8`}>
        <div>
          <img class={tw`mx-auto h-12 w-auto`} src="/logo.svg" alt="Workflow" />
          <h2
            class={tw`mt-6 text-center text-3xl tracking-tight font-bold text-gray-900`}
          >
            Sign in to your account
          </h2>
        </div>
        <Login />
      </div>
    </div>
  );
}
