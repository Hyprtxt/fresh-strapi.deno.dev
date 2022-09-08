import Nav from "@/islands/Nav.jsx";
import { CSS, render } from "gfm";
import { asset, Head } from "$fresh/runtime.ts";
import { DENO_ENV } from "@/utils/config.js";

export const handler = {
  GET: async (req, ctx) => {
    const markdown = await Deno.readTextFile(`README.md`);
    const rootUrl =
      "https://github.com/Hyprtxt/fresh-strapi.deno.dev/blob/main";
    const readme = render(markdown, rootUrl);
    return ctx.render({ ...ctx.state, CSS, readme });
  },
};

export default function PageHome({ data }) {
  const { CSS, readme } = data;
  return (
    <Layout data={data}>
      <div class="p-4 mx-auto max-w-screen-md">
        <Head>
          <style>{CSS}</style>
        </Head>
        <img
          src={asset("/logo.svg")}
          height="100px"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />
        <main
          data-color-mode="light"
          data-light-theme="light"
          data-dark-theme="dark"
          class="markdown-body"
          dangerouslySetInnerHTML={{ __html: readme }}
        >
        </main>
      </div>
    </Layout>
  );
}

export const Layout = ({ children, data }) => {
  return (
    <>
      <Nav />
      {children}
      {DENO_ENV === "development"
        ? <pre>{JSON.stringify(data, null, 2)}</pre>
        : ""}
    </>
  );
};
