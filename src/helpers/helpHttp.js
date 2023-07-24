export const helpHttp = () => {
  const custonFetch = (endpoint, options) => {
    const defaultHeader = {
      accept: "application/json",
    };

    const controller = new AbortController();
    options.signal = controller.signal;

    options.method = options.method || "GET";
    options.headers = options.headers
      ? { ...defaultHeader, ...options.headers }
      : defaultHeader;

    options.body = JSON.stringify(options.body) || false;
    if (!options.body) delete options.body;

    //console.log(options);
    setTimeout(() => controller.abort(), 5000);

    return fetch(endpoint, options)
      .then((res) =>
        res.status === 200
          ? res.json()
          : Promise.reject({
              err: true,
              status: res.status || "00",
              statusText: res.statusText || "Ocurrió un error",
            })
      )
      .catch((err) => {
        return {
          err: true,
          status: err.status || "00",
          statusText: err.message || err.statusText || "Ocurrió un error inesperado",
        };
      });
  };

  const get = (url, options = {}) => custonFetch(url, options);

  const post = (url, options = {}) => {
    options.method = "POST";
    return custonFetch(url, options);
  };

  const put = (url, options = {}) => {
    options.method = "PUT";
    return custonFetch(url, options);
  };

  const del = (url, options = {}) => {
    options.method = "DELETE";
    return custonFetch(url, options);
  };

  return { get, post, put, del };
};
