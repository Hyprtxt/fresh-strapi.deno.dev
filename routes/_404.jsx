/** @jsx h */
import { h } from "preact";
import { Layout } from "@/routes/index.jsx";
import { tw } from "@twind";

export default function Page404({ data }) {
  return (
    <Layout data={data}>
      <div class={tw`p-4 mx-auto max-w-screen-md`}>
        <p>Oh no! 404</p>
      </div>
    </Layout>
  );
}
