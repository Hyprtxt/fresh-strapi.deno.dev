import { Layout } from "@/routes/index.jsx"

export default function Page404({ data }) {
  return (
    <Layout data={data}>
      <div class="p-4 mx-auto max-w-screen-md">
        <h1 class="text-red text-4xl">404 Not Found</h1>
        <p class="my-6">
          We can't find the page you are looking for 🙃
        </p>
      </div>
    </Layout>
  )
}
