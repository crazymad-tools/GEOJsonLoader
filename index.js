// import { fetch } from 'https://cdnjs.cloudflare.com/ajax/libs/fetch/3.0.0/fetch.js';

class GEOJSONLoader {

  constructor() {

  }

  /**
   * 从url加载geojson
   * @param {String} url 
   */
  load(url, encoding = 'utf-8') {
    let worker = new Worker('parse.js');
    worker.postMessage({
      method: 'start',
    });

    worker.onMessage = (e) => {
      console.log(e.data);
    }
    return fetch(url).then((response) => {
      const $this = this;
      const reader = response.body.getReader();
      let prefix = new Uint8Array(0);
      let decoder = new TextDecoder(encoding);
      const stream = new ReadableStream({
        start(controller) {
          function push() {
            reader.read().then(({ done, value }) => {
              if (done) {
                controller.close();
                return;
              }

              controller.enqueue(value);
              let str = decoder.decode(value, { stream: true });
              // console.log(str.substring(str.length - 10));
              push();
            });
          };

          push();
        }
      });
    });

  }
}
export { GEOJSONLoader };
