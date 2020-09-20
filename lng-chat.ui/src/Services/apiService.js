import { accountService } from "./accountService";

const apiRoot = "https://localhost:44361/api/";

export const api = {
  httpGet,
  httpPut,
  httpPost,
  httpDelete,
};

function httpGet(path, parameters, anonymous) {
  return execute("GET", createUrl(path, parameters), anonymous);
}

function httpPut(path, parameters, anonymous) {
  return execute("PUT", createUrl(path), anonymous, parameters);
}

function httpPost(path, parameters, anonymous) {
  return execute("POST", createUrl(path), anonymous, parameters);
}

function httpDelete(path, parameters, anonymous) {
  return execute("DELETE", createUrl(path, parameters), anonymous);
}

function createUrl(path, queryParams) {
  var url = new URL(path, apiRoot);
  if (queryParams) {
    for (const name in queryParams) {
      url.searchParams.append(name, queryParams[name]);
    }
  }
  return url.href;
}

function execute(method, url, anonymous, body) {
  let headers = { "Content-Type": "application/json" };
  if (!anonymous) {
    headers.Authorization = accountService.currentUser.accessToken;
  }
  return fetch(url, { method, headers, body }).then((response) => {
    if (!response.ok) {
      if (!anonymous && (response.status === 401 || response.status === 403)) {
        accountService.logout();
        window.location.reload(true);
      }
      console.error(
        `Server responded to "${response.url}" with status code ${response.status}.`
      );

      return Promise.reject(response.statusText);
      //throw response.statusText;
    }
  });
}
