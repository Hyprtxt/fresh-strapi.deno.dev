## Fresh Strapi

An open source Fresh Example Project using Redis and Strapi.

https://fresh-strapi.deno.dev

https://github.com/Hyprtxt/fresh-strapi.deno.dev

[![Made with Fresh](https://fresh-strapi.deno.dev/fresh-badge.svg)](https://fresh.deno.dev)

Like what you see? Please leave me a star!

[![Github Repo Stars](https://img.shields.io/github/stars/Hyprtxt/fresh-strapi.deno.dev?style=social)](https://github.com/Hyprtxt/fresh-strapi.deno.dev)

## Configure it

You'll need a strapi install, and a redis server. You can install redis on your
Strapi server. You can also use this project with local strapi and redis.

```
cp .env.example .env
```

Then open [.env](./.env.example) and add your secrets.

```
code .env
```

## Deploy it

Add your secrets on Deno Deploy, it's really easy1!!

There is a build step now, it makes your fresh sites lightning fast. It uses
GitHub Actions and is
[compatible with Deno Deploy](https://fresh.deno.dev/docs/concepts/ahead-of-time-builds)

#### Self Hosted

For self hosted, use the run task `deno task run`, to run the project in
production mode. I still use `pm2` to monitor my Deno processes in production. I
also use nginx as my webserver and configure proxies to the individual
processes.

## Puppeteer Testing

This project also has code to help you test your site. Using fetch for the API
routes, puppetteer for end to end testing, and GitHub actions for CI. That's
right:

Puppeteer Testing integrated with Github Actions!

Try:

```
deno test -A
```

You'll need to install Chromium first, running the test suite will provide the
install command if it is not found.

The test runner is called
[Fresh Marionette](https://deno.land/x/fresh_marionette@v2.0.1)

## Github Actions

Runs `deno fmt` and the Puppeteer tests on Github Actions using a Linux Host.

[.github/workflows/deno.yml](.github/workflows/deno.yml)

#### Secrets for GitHub Actions

Use this command to get the secret contents

```
base64 -i .env.github | pbcopy
```

Configure a "Repository Secret" for GitHub Actions:

https://github.com/Hyprtxt/fresh-strapi.deno.dev/settings/secrets/actions

secret name should be `ENV_GITHUB_ACTIONS`

## Fresh Usage

Start the project:

```
deno task start
```

This will watch the project directory and restart as necessary.

## ~~A Short~~ History

I really like Deno and I was using it in 2021 because I was learning things
about the browser from it. I made my own system for serving websites and I
called it gaslight. You can see it here:
https://github.com/Hyprtxt/gaslight.dev.

In May 2022 I used Deno and some ideas from Gaslight (but with JSX) to develop 2
websites and a Strapi instance professionally for https://andbounds.com. During
development, Fresh was released (June 2022) and I migrated the 2 sites over to
Fresh and started work on a third site. This website Fresh-Strapi, created with
permission and blessing of ANDBOUNDS, is a cousin to those 3 sites. It includes
code that was common across all 3 sites to create a starting point for future
projects. Any projects that want to use a Strapi installation to do JWT sessions
securely right from the start. And OAuth2 too!

Now I'm just trying to keep it updated and upgraded to the latest versions of
Fresh. I also need to upgrade puppeteer to use the version from NPM instead of
the deno port that is pinned to an old version.

### Things here that you don't get from Fresh alone:

- Redis Session Middleware
- Global Config via .env
- Test Harness
- Puppeteer Test Harness
- GitHub Actions Integration
- My opinons about Template setup
- A Google Tag Manager Element
- Ready for Strapi as JWT provider

### See Also

https://videopoker.academy is the another website in the Fresh-Strapi family.
One that doesn't use Strapi.

https://kv-strapi.deno.dev/ Similar Auth ideas, but using Fresh Sessions instead
of Redis: https://github.com/digitaldesigndj/kv-strapi
