import { accountService } from "./accountService";

const apiRoot = "https://localhost:44361/api/";

export const api = {
  getAsync,
  patchAsync,
  postAsync,
  deleteAsync,
};

function getAsync(path, parameters, headers, anonymous) {
  return executeAsync("GET", createUrl(path, parameters), anonymous, headers);
}

function patchAsync(path, parameters, headers, anonymous) {
  return executeAsync("PATCH", createUrl(path), anonymous, headers, parameters);
}

function postAsync(path, parameters, headers, anonymous) {
  return executeAsync("POST", createUrl(path), anonymous, headers, parameters);
}

function deleteAsync(path, parameters, headers, anonymous) {
  return executeAsync(
    "DELETE",
    createUrl(path, parameters),
    anonymous,
    headers
  );
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

function executeAsync(method, url, anonymous, headers, body) {
  let accessToken = accountService.accessToken;
  if (!accessToken && !anonymous) {
    window.location.href = window.location.origin;
    return;
  }

  if (!headers) {
    headers = { "Content-Type": "application/json" };
  } else if (!("Content-Type" in headers)) {
    headers["Content-Type"] = "application/json";
  }

  if (!anonymous) {
    headers.Authorization = "Bearer " + accountService.accessToken;
  }
  return fetch(url, { method, headers, body: JSON.stringify(body) }).then(
    (response) => {
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
    }
  );
}
