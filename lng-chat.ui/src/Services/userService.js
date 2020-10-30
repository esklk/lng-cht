import { api } from "./apiService";

export const userService = {
  getUserAsync,
  updateUserAsync
};

function getUserAsync(){
    return api.getAsync("users").then(response => response.json());
}

function updateUserAsync(userData){
    return null;
}