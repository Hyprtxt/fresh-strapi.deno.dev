/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import Counter from "../islands/Counter.tsx";
import { CSS, render } from "gfm";
import { Head } from "$fresh/runtime.ts";

export const handler = {
  GET: async (req, ctx) => {
    const markdown = await Deno.readTextFile(`README.md`);
    const rootUrl = "https://github.com/Hyprtxt/marionette.deno.dev/blob/main";
    const readme = render(markdown, rootUrl);
    return ctx.render({ CSS, readme, url: req.url });
  },
};

export default function PageHome({ data }) {
  const { CSS, readme } = data;
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <Head>
        <style>{CSS}</style>
      </Head>
      <img
        src="/logo.svg"
        height="100px"
        alt="the fresh logo: a sliced lemon dripping with juice"
      />
      <p class={tw`my-6`}>
        Welcome to `fresh`. Try updating this message in the ./routes/index.tsx
        file, and refresh.
      </p>
      <Counter start={3} />
      <main
        data-color-mode="light"
        data-light-theme="light"
        data-dark-theme="dark"
        class="markdown-body"
        dangerouslySetInnerHTML={{ __html: readme }}
      >
      </main>
    </div>
  );
}
