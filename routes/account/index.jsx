/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

export const handler = {
  GET: (req, ctx) => {
    return ctx.render({ ...ctx.state, url: new URL(req.url) });
  },
};

export default function PageAccount({ data }) {
  const { url } = data;
  console.log(url);
  return (
    <div id="account" class={tw`p-4 mx-auto max-w-screen-md`}>
      <img
        src="/logo.svg"
        height="100px"
        alt="the fresh logo: a sliced lemon dripping with juice"
      />
      <p class={tw`my-6`}>
        Welcome to the users only section of this website
      </p>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
}
