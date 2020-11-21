import "./FindUser.css";
import { CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useI18n } from "../../Shared/i18nContext";
import { userService } from "../../Shared/Services/userService";
import UserEntry from "./UserEntry/UserEntry";

export default function FindUser() {
  const [isLoading, setIsLoading] = useState(true);
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
      .then((langFilter) =>
        userService.getUsersAsync(langFilter.toLearn, langFilter.toTeach, 100, 0)
      )
      .then((users) => setSearchResults(users))
      .catch((error) => console.error("Error while loading user list.", error))
      .finally(() => setIsLoading(false));
  }, []);

  return isLoading ? (
    <div className="search-results-loader-container">
      <CircularProgress />
    </div>
  ) : (
    <div className="search-results-container">
      {searchResults.map((user) => (
        <UserEntry
          key={user.id}
          firstName={user.firstName}
          lastName={user.lastName}
          pictureUrl={user.profilePictureUrl}
          languagesToLearn={user.languagesToLearn}
          languagesToTeach={user.languagesToTeach}
        />
      )) || i18n.nothingCouldBeFound}
    </div>
  );
}
