import Nav from "@/islands/Nav.jsx"
import { CSS, render } from "gfm"
import { asset, Head } from "$fresh/runtime.ts"
import { DENO_ENV } from "@/utils/config.js"

export const handler = {
  GET: async (req, ctx) => {
    const markdown = await Deno.readTextFile(`README.md`)
    const rootUrl = "https://github.com/Hyprtxt/fresh-strapi.deno.dev/blob/main"
    const readme = render(markdown, rootUrl)
    return ctx.render({ ...ctx.state, CSS, readme })
  },
}

const Footer = () => (
  <div class="p-4 mx-auto max-w-screen-md">
    <p class="mt-20 mb-6 sm:flex sm:justify-between">
      <a
        href="https://github.com/Hyprtxt/fresh-strapi.deno.dev"
        class="text-blue-500 hover:underline flex gap-2 items-center"
      >
        <svg
          class="h-5 w-5 text-gray-500"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_1989_191)">
            <path
              d="M7.00001 0C3.13391 0 0 3.21295 0 7.17755C0 10.3482 2.0055 13.0388 4.7873 13.9875C5.1373 14.0534 5.26471 13.832 5.26471 13.6414C5.26471 13.4716 5.25912 13.0195 5.25561 12.4212C3.3082 12.8547 2.8973 11.4589 2.8973 11.4589C2.5795 10.6291 2.1203 10.4084 2.1203 10.4084C1.48471 9.96418 2.16861 9.97279 2.16861 9.97279C2.87071 10.0229 3.24032 10.7122 3.24032 10.7122C3.86472 11.8085 4.87903 11.4918 5.27732 11.3084C5.34171 10.8448 5.52232 10.5288 5.72251 10.3497C4.16851 10.1684 2.534 9.55218 2.534 6.80211C2.534 6.01893 2.807 5.37764 3.2543 4.87605C3.1822 4.69476 2.94211 3.96463 3.32289 2.97722C3.32289 2.97722 3.91089 2.78376 5.24789 3.71238C5.77305 3.55992 6.37629 3.47184 6.99948 3.4709C7.59448 3.47377 8.19351 3.5533 8.7528 3.71238C10.0891 2.78376 10.6757 2.97649 10.6757 2.97649C11.0579 3.9646 10.8171 4.69475 10.7457 4.87603C11.1937 5.3776 11.4653 6.0189 11.4653 6.80208C11.4653 9.55931 9.82799 10.1662 8.26908 10.3439C8.52037 10.5653 8.74368 11.0031 8.74368 11.6731C8.74368 12.6318 8.73529 13.4064 8.73529 13.6414C8.73529 13.8335 8.86129 14.057 9.21689 13.9868C12.0205 13.0032 14 10.3285 14 7.18046C14 7.17943 14 7.17841 14 7.17738C14 3.21278 10.8654 0 7.00001 0Z"
              fill="currentColor"
            >
            </path>
          </g>
          <defs>
            <clipPath id="clip0_1989_191">
              <rect width="14" height="14" fill="white"></rect>
            </clipPath>
          </defs>
        </svg>
        Source code
      </a>
      <a
        href="https://fresh.deno.dev"
        class="text-blue-500 hover:underline"
      >
        <img
          width="197"
          height="37"
          src="https://fresh.deno.dev/fresh-badge.svg"
        />
      </a>
      <a
        href="https://hyprtxt.dev"
        class="text-blue-500 hover:underline flex gap-2 items-center"
      >
        <svg
          class="h-5 w-5 text-gray-500"
          width="240"
          height="240"
          viewBox="0 0 240 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="main_group"></g>
          <circle
            stroke="#000000"
            id="circle1"
            stroke-width="0px"
            cy="120px"
            fill="#271f3f"
            r="120px"
            cx="120px"
            transform=""
            visibility="visible"
          >
          </circle>
          <polygon
            points="38.225418,113.270493 74.350418,94.895477 74.600418,78.395493 20.850418,106.020477 20.225418,119.770493 73.850418,147.270477 74.225418,130.895493 "
            stroke="none"
            id="polygon1"
            stroke-width="3px"
            fill="#59a188"
            transform=""
          >
          </polygon>
          <polygon
            points="144,62.5 158.5,65 93,179.5 78.5,178 "
            stroke="none"
            id="polygon2"
            stroke-width="3px"
            fill="#59a188"
            transform=""
          >
          </polygon>
          <polygon
            points="182.725418,108.770493 218.850418,90.395477 219.100418,73.895493 165.350418,101.520477 164.725418,115.270493 218.350418,142.770477 218.725418,126.395493 "
            stroke="none"
            stroke-width="3px"
            id="polygon3"
            fill="#3ba388"
            transform="rotate(180 192.912918 110.832985)"
          >
          </polygon>
        </svg>
        Built by @Hyprtxt
      </a>
    </p>
  </div>
)

export default function PageHome({ data }) {
  const { CSS, readme } = data
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
        <Footer />
      </div>
    </Layout>
  )
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
  )
}
