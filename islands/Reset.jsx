// import { useState } from "preact/hooks";
const ResetPasswordForm = (props) => {
  // const [count, setCount] = useState(props.start);
  const { code } = props
  return (
    <form class="space-y-6 mt-8" action="/reset-password" method="POST">
      {/* <input type="hidden" name="remember" value="true" /> */}
      <input type="hidden" name="code" value={code}></input>
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="password" class="sr-only">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autocomplete="new-password"
            required
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-yellow-300 focus:border-yellow-300 focus:z-10 sm:text-sm"
            placeholder="New Password"
          />
        </div>
      </div>
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="passwordConfirmation" class="sr-only">Password</label>
          <input
            id="passwordConfirmation"
            name="passwordConfirmation"
            type="password"
            autocomplete="confirm-password"
            required
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-yellow-300 focus:border-yellow-300 focus:z-10 sm:text-sm"
            placeholder="Confirm Password"
          />
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="text-sm">
          <a
            href="/login"
            class="font-medium text-yellow-400 hover:text-yellow-300"
          >
            Login instead
          </a>
        </div>
      </div>
      <div>
        <button
          type="submit"
          id="login-submit"
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300"
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
          Reset my Password
        </button>
      </div>
    </form>
  )
}

export default ResetPasswordForm
