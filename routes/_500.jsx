import { Layout } from "@/routes/index.jsx"
import { DENO_ENV } from "@/utils/config.js"

export default function Page500(props) {
  const { error } = props
  let message = undefined
  if (error instanceof Error) {
    message = error.stack
  } else {
    message = String(error)
  }
  return (
    <Layout data={props}>
      <div class="p-4 mx-auto max-w-screen-md">
        <h1 class="text-red text-4xl">500 Server Error</h1>
        <p class="my-6">
          There was a problem on the server 🙃
        </p>
        {DENO_ENV === "development" ? <pre>{message}</pre> : <></>}
        <p class="my-6">
          Please try again later
        </p>
      </div>
    </Layout>
  )
}
