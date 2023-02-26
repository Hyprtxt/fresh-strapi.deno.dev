// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" }
import * as $0 from "./routes/_404.jsx"
import * as $1 from "./routes/_middleware.js"
import * as $2 from "./routes/account/_middleware.js"
import * as $3 from "./routes/account/index.jsx"
import * as $4 from "./routes/api/[provider]/auth.js"
import * as $5 from "./routes/api/joke.ts"
import * as $6 from "./routes/forgot-password/index.jsx"
import * as $7 from "./routes/forgot-password/success.jsx"
import * as $8 from "./routes/index.jsx"
import * as $9 from "./routes/login/[provider].js"
import * as $10 from "./routes/login/index.jsx"
import * as $11 from "./routes/logout.jsx"
import * as $12 from "./routes/reset-password/index.jsx"
import * as $13 from "./routes/signup.jsx"
import * as $14 from "./routes/unauthorized.tsx"
import * as $$0 from "./islands/Forgot.jsx"
import * as $$1 from "./islands/Login.jsx"
import * as $$2 from "./islands/Nav.jsx"
import * as $$3 from "./islands/Reset.jsx"
import * as $$4 from "./islands/Signup.jsx"

const manifest = {
	routes: {
		"./routes/_404.jsx": $0,
		"./routes/_middleware.js": $1,
		"./routes/account/_middleware.js": $2,
		"./routes/account/index.jsx": $3,
		"./routes/api/[provider]/auth.js": $4,
		"./routes/api/joke.ts": $5,
		"./routes/forgot-password/index.jsx": $6,
		"./routes/forgot-password/success.jsx": $7,
		"./routes/index.jsx": $8,
		"./routes/login/[provider].js": $9,
		"./routes/login/index.jsx": $10,
		"./routes/logout.jsx": $11,
		"./routes/reset-password/index.jsx": $12,
		"./routes/signup.jsx": $13,
		"./routes/unauthorized.tsx": $14,
	},
	islands: {
		"./islands/Forgot.jsx": $$0,
		"./islands/Login.jsx": $$1,
		"./islands/Nav.jsx": $$2,
		"./islands/Reset.jsx": $$3,
		"./islands/Signup.jsx": $$4,
	},
	baseUrl: import.meta.url,
	config,
}

export default manifest
