import { api } from "./apiService";
import { fileService } from "./fileService";

export const chatService = {
  getChatListAsync,
  getMessagesAsync,
  sendMessageToChatAsync,
  sendMessageToUserAsync,
  uploadAttachmentAsync,
};

function getChatListAsync(limit, offset) {
  let searchParams = new URLSearchParams();
  if (limit) {
    searchParams.append("limit", limit);
    if (offset) {
      searchParams.append("offset", offset);
    }
  }

  return api
    .getAsync("chats?" + searchParams.toString())
    .then((response) => response.json());
}

function getMessagesAsync(chatId, limit, offset) {
  let searchParams = new URLSearchParams();
  if (limit) {
    searchParams.append("limit", limit);
    if (offset) {
      searchParams.append("offset", offset);
    }
  }

  return api
    .getAsync(`chats/${chatId}/messages?` + searchParams.toString())
    .then((response) => response.json());
}

function sendMessageToChatAsync(chatId, contentType, content) {
  return api
    .postAsync(`chats/${chatId}/messages`, { contentType, content })
    .then((response) => response.json());
}

function sendMessageToUserAsync(userId, contentType, content) {
  let searchParams = new URLSearchParams();
  searchParams.append("toUserId", userId);

  return api
    .postAsync("chats/messages?" + searchParams.toString(), {
      contentType,
      content,
    })
    .then((response) => response.json());
}

function uploadAttachmentAsync(dataUrlToUpload) {
  return new Promise((resolve, reject) =>
    dataUrlToUpload && typeof dataUrlToUpload === "string"
      ? resolve(dataUrlToUpload)
      : reject(
          new Error(
            "Argument dataUrlToUpload must be a not empty data url string."
          )
        )
  ).then((dataUrl) => fileService.uploadFileAsync(dataUrl));
}
