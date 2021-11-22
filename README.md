# Co-bran Web

It is a web server but for short I named it "Web".

## Motivation

Oh, well, this is another silly project that is meant to use [Co-bran](https://github.com/ibetovski/co-bran) encoder but as a web server. The idea behind it is simply to play with Deno and specifically:

- Security permissions
    - Reading from ENV
    - Reading files
    - Access network for webserver
    - Access to location

- HTTP WEB Server
- localStorage
- A dependency from another project

## How to start

```bash
$ export COBRAN_WEBSERVER_PORT=8080; \
    deno run \
    --allow-net=0.0.0.0:8080 \
    --allow-read=. \
    --location=http://localhost:8080/ \
    src/index.js
```

And then open `http://localhost:8080/`