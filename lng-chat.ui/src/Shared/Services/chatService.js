import { api } from "./apiService";

export const chatService = {
  getChatListAsync,
  getMessagesAsync,
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
