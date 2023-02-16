import { Layout } from "@/routes/index.jsx"

export default function Page404({ data }) {
  return (
    <Layout data={data}>
      <div class="p-4 mx-auto max-w-screen-md">
        <p>Oh no! 404</p>
      </div>
    </Layout>
  )
}
