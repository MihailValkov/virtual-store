const baseURL = process.env.REACT_APP_API_URL;
interface IOptions {
  method: string;
  headers: { [prop: string]: string };
  credentials?: "omit" | "same-origin" | "include";
  body?: any;
}

const httpRequest = async (method: string, url: string, body?: any) => {
  const options: IOptions = { method, credentials: "include", headers: {} };

  if (url.includes("upload")) {
    options.body = body;
  } else {
    options.headers["Content-type"] = "application/json";
    options.body = body ? JSON.stringify(body) : null;
  }

  const res = await fetch(`${baseURL}/${url}`, options);
  const [resAsJson, isOk] = await Promise.all([res.json(), res.ok]);
  return !isOk
    ? (() => { throw new Error(resAsJson.message) })()
    : resAsJson;
};

export const http = {
  get: httpRequest.bind(null, "GET"),
  post: httpRequest.bind(null, "POST"),
  put: httpRequest.bind(null, "PUT"),
  patch: httpRequest.bind(null, "PATCH"),
  del: httpRequest.bind(null, "DELETE"),
};
