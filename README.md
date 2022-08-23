## Fresh Strapi

An open source Fresh Example Project using Redis and Strapi.

https://fresh-strapi.deno.dev

https://github.com/Hyprtxt/fresh-strapi.deno.dev

## Puppeteer Testing

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
Fork the project and push to main or test to try it out.

.github/workflows/deno.yml

### Things to do

Setup the tests so they launch the project, and test that version.

## Fresh Usage

Start the project:

```
deno task start
```

This will watch the project directory and restart as necessary.
