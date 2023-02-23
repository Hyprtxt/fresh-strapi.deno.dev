import { Layout } from "@/routes/index.jsx"
import { TOKEN } from "@/utils/config.js"

const LC_URL = "https://api.linceo.club/api"

export const handler = {
  GET: async (_req, ctx) => {
    const page = await fetch(
      `${LC_URL}/pages?filters[slug][$eq]=${ctx.params.slug}&populate=*`,
      {
        headers: new Headers({
          Authorization: `Bearer ${TOKEN}`,
        }),
      },
    )
      .then(async (res) => await res.json())
    if (!page.data.length) {
      return ctx.renderNotFound()
    }
    return ctx.render({ ...ctx.state, page: page.data[0].attributes })
  },
}

export default function PageIndexPage(props) {
  const { data } = props
  const { meta, content } = data.page
  const { title, description } = meta
  return (
    <Layout data={data}>
      <div class="p-4 mx-auto max-w-screen-md">
        <h1>{title}</h1>
        <p>{description}</p>
        <p>Dynamic Component Loop Here:</p>
        <pre>{JSON.stringify(content, null,2)}</pre>
      </div>
    </Layout>
  )
}
