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

Then open [.env](./.env.example) and add your secrets. You can use the same
process to add secrets on Deno Deploy

## Puppeteer Testing

This project also has code to help you test your site. Using fetch for the API
routes, puppetteer for end to end testing, and GitHub actions for CI. That's
right:

Puppeteer Testing integrated with Github Actions!

Try:

```
deno test -A
```

But you'll need to install chrome with this first:

```
PUPPETEER_PRODUCT=chrome deno run -A --unstable https://deno.land/x/puppeteer@14.1.1/install.ts
```

(mac & linux, run `deno test -A` on windows and hopefully it will give you the
right link)

## Github Actions

Runs `deno fmt` and the Puppeteer tests on Github Actions using a Linux Host.

[.github/workflows/deno.yml](.github/workflows/deno.yml)

### Things to do

Setup the tests so they launch the project, and test that version.

Document how secrets are added to github (base64 encode trick)

## Fresh Usage

Start the project:

```
deno task start
```

This will watch the project directory and restart as necessary.

### Things to do

- Add pages and forms for the forgot password flow

### ~A Short~ History

I really like Deno and I was using it in 2021 because I was learning things about the browser from it. I made my own system for serving websites and I called it gaslight. You can see it here: https://github.com/Hyprtxt/gaslight.dev.

In May 2022 I used Deno and some ideas from Gaslight (but with JSX) to develop 3 websites and a Strapi instance professionally for https://andbounds.com. During development, Fresh was released (June 2022) and I migrated all 3 sites over to it. This website Fresh-Strapi, created with permission and blessing of ANDBOUNDS, is a cousin to those 3 sites. It includes code that was common across all 3 sites to create a starting point for future projects. Projects that could use api.andbounds.com or any Strapi installation securely and quickly. 

### Things here that you don't get from Fresh alone:

* Redis Session Middleware
* Environment Config
* Test Harness
* GitHub Actions Integration
* My opinons about Template setup
* A Google Tag Manager Element
* Strapi (which is optional, and not really here, Bring your own)

### See Also

https://videopoker.academy is the another website in the Fresh-Strapi family. One that doesn't use Strapi.
