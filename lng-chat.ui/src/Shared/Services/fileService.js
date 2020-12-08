import { api } from "./apiService";

export const fileService = {
  uploadFileAsync,
};

function uploadFileAsync(dataUrl) {
  return api
    .postAsync("files", { dataUrl })
    .then((response) => response.text());
}
