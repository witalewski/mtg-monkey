import parseJsonAsync from "./parse-json-async";

const gmFetch = (url) =>
  new Promise((resolve, reject) =>
    GM.xmlHttpRequest({
      method: "GET",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      onload: async (response) => {
        if (response.response) {
          try {
            const json = await parseJsonAsync(response.response);
            resolve(json);
          } catch (e) {
            reject(e);
          }
        } else {
          reject();
        }
      },
      onerror: reject,
      ontimeout: reject,
    })
  );

export default gmFetch;
