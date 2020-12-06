import React, { createContext, useContext, useMemo } from "react";
const signalR = require("@microsoft/signalr");
const ChatContext = createContext();

class ChatWrapper {
  #recievers = {};
  #connection;
  #dispatchMessage = (message) => {
    for (var key in this.#recievers) {
      this.#recievers[key](message);
    }
  };

  /**
   * @param {signalR.HubConnection} connection The chat connection.
   */
  constructor(connection) {
    if (!connection) {
      throw new Error("Connection is required");
    }
    if (!connection instanceof signalR.HubConnection) {
      throw new Error("Connection must be instance of HubConnection");
    }
    this.#connection = connection;

    connection.on("Message", this.#dispatchMessage);

    this.#connection.start();
  }

  addReciever = (key, callback) => {
    if (!callback) {
      throw new Error("Callback is required.");
    }
    if ({}.toString.call(callback) !== "[object Function]") {
      throw new Error("Callback must be a function.");
    }
    this.#recievers[key] = callback;
  };
}

export const useChat = (onMessageRecieved) =>
  useContext(ChatContext).addReciever(
    onMessageRecieved.toString(),
    onMessageRecieved
  );

export const ChatProvider = ({ children, accessToken }) => {
  if (!accessToken) {
    throw new Error("No access token provided.");
  }

  const chatWrapper = useMemo(() => {
    let chatConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:44361/chat", {
        accessTokenFactory: () => accessToken,
        withCredentials: true,
      })
      .build();

    return new ChatWrapper(chatConnection);
  }, [accessToken]);

  return (
    <ChatContext.Provider value={chatWrapper}>{children}</ChatContext.Provider>
  );
};
