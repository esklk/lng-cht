import { api } from "./apiService";

export const userService = {
  getUserAsync,
  updateUserAsync,
  getUsersAsync,
};

function getUsersAsync(langsToLearn, langsToTeach, limit, offset) {
  var searchParams = new URLSearchParams();
  if (langsToLearn) {
    searchParams.append("languagesToLearn", JSON.stringify(langsToLearn));
  }
  if (langsToTeach) {
    searchParams.append("languagesToTeach", JSON.stringify(langsToTeach));
  }
  if (limit) {
    searchParams.append("limit", limit);
    if (offset) {
      searchParams.append("offset", offset);
    }
  }

  return api
    .getAsync("users?" + searchParams.toString())
    .then((response) => response.json());
}

function getUserAsync() {
  return api.getAsync("users/current").then((response) => response.json());
}

function updateUserAsync(userData) {
  return api.patchAsync("users/current", userData).then((response) => response.json());
}
