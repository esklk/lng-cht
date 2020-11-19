import { accountService } from "./accountService";

const apiRoot = "https://localhost:44361/api/";

export const api = {
  getAsync,
  patchAsync,
  postAsync,
  deleteAsync,
};

function getAsync(path, parameters, anonymous) {
  return executeAsync("GET", createUrl(path, parameters), anonymous);
}

function patchAsync(path, parameters, anonymous) {
  return executeAsync("PATCH", createUrl(path), anonymous, parameters);
}

function postAsync(path, parameters, anonymous) {
  return executeAsync("POST", createUrl(path), anonymous, parameters);
}

function deleteAsync(path, parameters, anonymous) {
  return executeAsync("DELETE", createUrl(path, parameters), anonymous);
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

function executeAsync(method, url, anonymous, body) {
  let accessToken = accountService.accessToken;
  if (!accessToken && !anonymous) {
    window.location.href = window.location.origin;
    return;
  }

  let headers = { "Content-Type": "application/json" };
  if (!anonymous) {
    headers.Authorization = "Bearer " + accountService.accessToken;
  }
  return fetch(url, { method, headers, body: JSON.stringify(body) }).then((response) => {
    if (response.ok) {
      return response;
    }

    if (!anonymous && (response.status === 401 || response.status === 403)) {
      accountService.logout();
      window.location.href = window.location.origin;
      return;
    }
    console.error(
      `Server responded to "${response.url}" with status code ${response.status}.`
    );

    return Promise.reject(response.statusText);
  });
}