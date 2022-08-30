/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Layout } from "@/routes/index.jsx";
import PageLogin from "@/routes/login/index.jsx";

export const handler = {
  GET: async (req, ctx) => {
    const resp = await ctx.render({
      ...ctx.state,
      url: new URL(req.url),
    });
    if (ctx.state.unauthorized) {
      return new Response(resp.body, {
        status: 401,
        headers: resp.headers,
      });
    } else {
      return resp;
    }
  },
};

export default function PageAccount(props) {
  const { data } = props;
  const { url, unauthorized } = data;
  // console.log(url);
  if (unauthorized) {
    return PageLogin(props);
  }
  return (
    <Layout data={data}>
      <div id="account" class={tw`p-4 mx-auto max-w-screen-md`}>
        <img
          src="/logo.svg"
          height="100px"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />
        <p class={tw`my-6`}>
          Welcome to the users only section of this website
        </p>
      </div>
    </Layout>
  );
}
