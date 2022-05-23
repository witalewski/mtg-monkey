const parseJsonAsync = (rawJsonData) =>
  new Promise((resolve) => {
    var blob = new Blob(
      ["onmessage = ({ data }) => postMessage(JSON.parse(data));"],
      { type: "text/javascript" }
    );

    var url = URL.createObjectURL(blob);
    var worker = new Worker(url);

    worker.onmessage = ({ data }) => resolve(data);
    worker.postMessage(rawJsonData);
  });

export default parseJsonAsync;
