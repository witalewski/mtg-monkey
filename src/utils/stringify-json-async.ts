const stringifyJsonAsync = (jsonData) =>
  new Promise((resolve) => {
    var blob = new Blob(
      ["onmessage = ({ data }) => postMessage(JSON.stringify(data));"],
      { type: "text/javascript" }
    );

    var url = URL.createObjectURL(blob);
    var worker = new Worker(url);

    worker.onmessage = ({ data }) => resolve(data);
    worker.postMessage(jsonData);
  });

export default stringifyJsonAsync;
