# Co-bran Web

It is a web server but for short I named it "Web".

## Motivation

Oh, well, this is another silly project that is meant to use [Co-bran](https://github.com/ibetovski/co-bran) encoder but as a web server. The idea behind it is simply to play with Deno and specially:

- HTTP WEB Server
- localStorage
- A dependency from another project

## How to start

```bash
$ deno run --allow-net --allow-read=. --location=http://localhost:8080/ src/index.js
```

And then open `http://localhost:8080/`