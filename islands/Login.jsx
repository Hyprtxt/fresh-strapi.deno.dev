import { useEffect, useRef, useState } from "preact/hooks"
import { asset, Head } from "$fresh/runtime.ts"

const LoadFormValidation = () => (
	<Head>
		<script
			src={asset("./vendor/formvalidation/js/FormValidation.js")}
		/>
	</Head>
)

const LoginForm = (props) => {
	const [buttonDisabled, setButtonDisabled] = useState(false)
	const form = useRef(null)
	useEffect(() => {
		const fv = FormValidation.formValidation(
			form.current,
			{
				fields: {
					identifier: {
						validators: {
							notEmpty: {
								message: "Please provide an email address",
							},
							emailAddress: {
								message: "The value is not a valid email address",
							},
						},
					},
					password: {
						validators: {
							notEmpty: {
								message: "Please provide a password",
							},
							stringLength: {
								min: 6,
								message: "Passwords are at least 6 characters long",
							},
						},
					},
				},
				plugins: {
					message: new FormValidation.plugins.Message({
						container: ".validation-message",
					}),
					trigger: new FormValidation.plugins.Trigger(),
					submitButton: new FormValidation.plugins.SubmitButton(),
					defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
				},
			},
		)
		fv.on("core.form.valid", () => {
			setButtonDisabled(true)
		})
		// console.log(fv, form)
	}, [])
	return (
		<>
			<LoadFormValidation />
			<form ref={form} class="space-y-6 mt-8" action="/login" method="POST">
				<div class="validation-message text-red-500"></div>
				<div class="rounded-md shadow-sm -space-y-px">
					<div>
						<label for="identifier" class="sr-only">Username</label>
						<input
							id="identifier"
							name="identifier"
							type="text"
							required
							class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-300 focus:border-yellow-300 focus:z-10 sm:text-sm"
							placeholder="Username"
						/>
					</div>
					<div>
						<label for="password" class="sr-only">Password</label>
						<input
							id="password"
							name="password"
							type="password"
							autocomplete="current-password"
							required
							class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-yellow-300 focus:border-yellow-300 focus:z-10 sm:text-sm"
							placeholder="Password"
						/>
					</div>
				</div>

				<div class="flex items-center justify-between">
					<div class="text-sm">
						<a
							href="/forgot-password"
							class="font-medium text-yellow-400 hover:text-yellow-300"
						>
							Forgot your password?
						</a>
					</div>
				</div>
				<div>
					<button
						type="submit"
						id="login-submit"
						class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300"
						disabled={buttonDisabled}
					>
						<span class="absolute left-0 inset-y-0 flex items-center pl-3">
							<svg
								class="h-5 w-5 text-yellow-300 group-hover:text-yellow-400"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
									clip-rule="evenodd"
								/>
							</svg>
						</span>
						Sign in
					</button>
				</div>
			</form>
		</>
	)
}

export default LoginForm
