import { api } from "./apiService";

export const userService = {
  getUserAsync,
  updateUserAsync
};

function getUserAsync(){
    return api.getAsync("users/current").then(response => response.json());
}

function updateUserAsync(userData){
    return api.patchAsync("users/current", userData);
}