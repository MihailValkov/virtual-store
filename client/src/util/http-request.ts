const baseURL = process.env.REACT_APP_API_URL;
const httpRequest = (method: string, url: string, body: {} | null = null) => {
  return fetch(`${baseURL}/${url}`, {
    method,
    headers: { 'Content-type': 'application/json' },
    credentials: 'include',
    body: body ? JSON.stringify(body) : null,
  })
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
