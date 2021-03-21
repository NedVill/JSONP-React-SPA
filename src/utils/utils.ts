type Config = {
  method: string,
  body?: string,
};

const fetchJson = (url: string, config: Config): Promise<Response> => {
  const { method, ...otherConfig } = config;
  const modifierConfig: object = {
    method,
    cache: 'no-cache',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    ...otherConfig,
  };

  return fetch(url, modifierConfig);
};

export default fetchJson;
