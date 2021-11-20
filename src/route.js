import { readLines, path } from "../dependencies.js";
import { cobran } from "../dependencies.js";
const decoder = new TextDecoder();


// Get the html template to return on the index
const filename = path.join(Deno.cwd(), "./src/tpl/index.html");
let fileReader = await Deno.open(filename);
let htmlTpl = ''
for await (let line of readLines(fileReader)) {
  htmlTpl = `${htmlTpl}\n${line}`;
}

export const routes = {
  '/': (req) => {
    const res = new Response(htmlTpl, {
      headers: {
        'Content-type': 'text/html',
      },
      status: 200
    });

    req.respondWith(res);
  },
  '/api/encode': async ({request, respondWith}) => {
    if (!request.body) {
      console.log('Nope, no body sent');
      const res = new Response(JSON.stringify({error: 'Nope. No body sent'}), {
        headers: {
          'Content-type': 'application/json'
        },
        status: 400
      });
  
      respondWith(res);
      return;
    }

    let body = decoder.decode(await request.arrayBuffer());
    body = JSON.parse(body);
    let encodedText = cobran.encodeSentence(body.text);

    let previous = localStorage.getItem('previous-texts') || `[]`;
    let previousParsed = JSON.parse(previous);

    const responseText = {
      from  : body.text,
      to    : encodedText
    };

    localStorage.setItem(
      'previous-texts',
      JSON.stringify([
        ...previousParsed,
        responseText
      ])
    );

    const res = new Response(JSON.stringify({
      from  : body.text,
      to    : encodedText
    }), {
      headers: {
        'Content-type': 'application/json'
      },
      status: 200
    });

    respondWith(res);
  },

  '/api/get-previous': ({request, respondWith}) => {
    let previous = localStorage.getItem('previous-texts') || `[]`;

    const response = new Response(
      previous,
      {
        status: 200
      }
    );

    respondWith(response);
  }
}