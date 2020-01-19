class Parser {
  lines = [];

  constructor() { }

  parse() { }

  push() { }
}

(() => {
  let parser = new Parser();
  self.addEventListener('message', (e) => {
    if (e.data.method === 'start') {
      let data = parser.parse();
    }
  });
  self.addEventListener('message', (e) => {
    if (e.data.method === 'push') {
      parser.push(e.data.line);
    }
  })
})()