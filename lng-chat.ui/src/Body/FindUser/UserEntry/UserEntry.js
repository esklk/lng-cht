import "./UserEntry.css";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Tooltip,
} from "@material-ui/core";
import { EmojiPeopleRounded, SwapHorizRounded } from "@material-ui/icons";
import React from "react";
import { useI18n } from "../../../Shared/i18nContext";
import { languageService } from "../../../Shared/Services/languageService";
import { chatService } from "../../../Shared/Services/chatService";

const languageLevels = languageService.getLanguageLevels();

const languageEntry = (code, level) => (
  <Tooltip
    arrow
    title={languageLevels.find((x) => x.index === level).shortName}
    placement="top"
    aria-label="language"
  >
    <Box className="language-entry" position="relative" display="inline-flex">
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <div
          className="flag-icon"
          style={{
            backgroundImage: `url(${
              languageService.getLanguageMetadata(code).flag
            })`,
          }}
        />
      </Box>
      <CircularProgress
        className="language-entry-circle bottom"
        variant="static"
        value={100}
        size={25}
        thickness={5}
      />
      <CircularProgress
        className="language-entry-circle top"
        variant="static"
        value={level * 20}
        size={25}
        thickness={5}
      />
    </Box>
  </Tooltip>
);

export default function UserEntry({
  userId,
  firstName,
  lastName,
  languagesToTeach,
  languagesToLearn,
  profilePictureUrl,
  onStartChatRequested,
}) {
  const i18n = useI18n();

  const handleSayHelloButtonClick = () => {
    if (onStartChatRequested) {
      onStartChatRequested(userId);
    }
  };

  const fullName = `${firstName} ${lastName}`;
  return (
    <div className="user-entry-container">
      <Avatar alt={fullName} src={profilePictureUrl} />
      <p className="user-name">{fullName}</p>
      <div className="user-entry-langs">
        {languagesToTeach?.map((lang, index) => (
          <div key={index}>{languageEntry(lang.code, lang.level)}</div>
        ))}
        {languagesToLearn && languagesToTeach ? <SwapHorizRounded /> : null}
        {languagesToLearn.map((lang, index) => (
          <div key={index}>{languageEntry(lang.code, lang.level)}</div>
        ))}
      </div>
      <Button>
        <EmojiPeopleRounded />
        <span onClick={handleSayHelloButtonClick} className="btn-hello-label">{i18n.sayHello}</span>
      </Button>
    </div>
  );
}
