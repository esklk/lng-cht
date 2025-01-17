import "./FindUser.css";
import { CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useI18n } from "../../Shared/i18nContext";
import { userService } from "../../Shared/Services/userService";
import UserEntry from "./UserEntry/UserEntry";
import { chatService } from "../../Shared/Services/chatService";

const limit = 20;

export default function FindUser() {
  const [isLoading, setIsLoading] = useState(true);
  const [langFilter, setLangFilter] = useState();
  // eslint-disable-next-line
  const [page, setPage] = useState(0); //TODO: update page when scrolled to bottom
  const [searchResults, setSearchResults] = useState([]);
  const i18n = useI18n();

  useEffect(() => {
    setIsLoading(true);
    userService
      .getUserAsync()
      .then((user) => {
        return {
          toTeach: user.languagesToLearn.map((lang) => {
            return { code: lang.code, levelMax: 4 };
          }),
          toLearn: user.languagesToTeach.map((lang) => {
            return { code: lang.code, levelMin: 1 };
          }),
        };
      })
      .then((langFilter) => setLangFilter(langFilter))
      .catch((error) => console.error("Error while loading user.", error))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!langFilter) {
      return;
    }

    setIsLoading(true);
    userService
      .getUsersAsync(
        langFilter.toLearn,
        langFilter.toTeach,
        limit,
        limit * page
      )
      .then((users) => {
        setSearchResults(users);
      })
      .catch((error) => console.error("Error while loading user list.", error))
      .finally(() => setIsLoading(false));
  }, [langFilter, page]);

  //TODO: add page update by scroll

  const handleStartChatRequest = (userId) => {
    if (!userId) {
      throw new Error("UserId is required.");
    }
    chatService
      .sendMessageToUserAsync(userId, "text", i18n.hello)
      .then(() =>
        setSearchResults((prev) => prev.filter((user) => user.id !== userId))
      );
  };

  return isLoading ? (
    <div className="search-results-loader-container">
      <CircularProgress />
    </div>
  ) : searchResults && searchResults.length > 0 ? (
    <div className="search-results-container">
      {searchResults.map((user) => (
        <UserEntry
          key={user.id}
          userId={user.id}
          firstName={user.firstName}
          lastName={user.lastName}
          profilePictureUrl={user.profilePictureUrl}
          languagesToLearn={user.languagesToLearn}
          languagesToTeach={user.languagesToTeach}
          onStartChatRequested={handleStartChatRequest}
        />
      ))}
    </div>
  ) : (
    <div className="search-results-loader-container">
      {i18n.nothingCouldBeFound}
    </div>
  );
}
