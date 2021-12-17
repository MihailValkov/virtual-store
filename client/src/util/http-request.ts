const baseURL = process.env.REACT_APP_API_URL;
interface IOptions {
  method: string;
  body?: any;
  headers?: string[][] | Record<string, string> | Headers | undefined;
  credentials?: 'omit' | 'same-origin' | 'include';
}

const httpRequest = (method: string, url: string, body?: any) => {
  let options: IOptions = { method, credentials: 'include' };

  if (url.includes('upload')) {
    options.body = body;
  } else {
    options.headers = {};
    options.headers['Content-type'] = 'application/json';
    options.body = body ? JSON.stringify(body) : null;
  }

  return fetch(`${baseURL}/${url}`, options)
    .then((res) => Promise.all([res.json(), res.ok]))
    .then(([res, isOk]) =>
      !isOk
        ? (function () {
            throw new Error(res.message);
          })()
        : res
    );
};

export const http = {
  get: httpRequest.bind(null, 'GET'),
  post: httpRequest.bind(null, 'POST'),
  put: httpRequest.bind(null, 'PUT'),
  patch: httpRequest.bind(null, 'PATCH'),
  del: httpRequest.bind(null, 'DELETE'),
};
