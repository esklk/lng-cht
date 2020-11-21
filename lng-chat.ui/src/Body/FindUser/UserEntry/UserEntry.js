import "./UserEntry.css";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { EmojiPeopleRounded, SwapHorizRounded } from "@material-ui/icons";
import React from "react";
import { useI18n } from "../../../Shared/i18nContext";

const languageEntry = (code, level) => (
  <Box className="language-entry" position="relative" display="inline-flex">
    <CircularProgress
      className="language-entry-circle-bottom"
      variant="static"
      value={100}
      size={25}
      thickness={5}
    />
    <CircularProgress
      className="language-entry-circle-top"
      variant="static"
      value={level * 20}
      size={25}
      thickness={5}
    />
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
      <Typography variant="caption" component="div" color="textPrimary">
        {code}
      </Typography>
    </Box>
  </Box>
);

export default function UserEntry({
  firstName,
  lastName,
  languagesToTeach,
  languagesToLearn,
  profilePictureUrl,
}) {
  const i18n = useI18n();
  const fullName = `${firstName} ${lastName}`;
  return (
    <div class="user-entry-container">
      <Avatar alt={fullName} src={profilePictureUrl} />
      <p className="user-name">{fullName}</p>
      <div className="user-entry-langs">
        {languagesToTeach?.map((lang) => languageEntry(lang.code, lang.level))}
        {languagesToLearn && languagesToTeach ? <SwapHorizRounded /> : null}
        {languagesToLearn.map((lang) => languageEntry(lang.code, lang.level))}
      </div>
      <Button>
        <EmojiPeopleRounded />
        <span className="btn-hello-label">{i18n.sayHello}</span>
      </Button>
    </div>
  );
}
