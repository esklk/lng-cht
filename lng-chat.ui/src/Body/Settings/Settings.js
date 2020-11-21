import "./Settings.css";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  RadioGroup,
  Radio,
  FormLabel,
  FormControlLabel,
  Button,
  Avatar,
  IconButton,
} from "@material-ui/core";
import React, { useState, useRef, useEffect } from "react";
import { Alert, Skeleton } from "@material-ui/lab";
import ISO6391 from "iso-639-1";
import RateableCheckboxListInput from "./RateableCheckboxListInput/RateableCheckboxListInput";
import { userService } from "../../Shared/Services/userService";
import { useI18n } from "../../Shared/i18nContext";
import { i18nService } from "../../Shared/Services/i18nService";
import { Brightness7, ExitToApp, NightsStay } from "@material-ui/icons";
import { accountService } from "../../Shared/Services/accountService";
import ImageUploading from "react-images-uploading";
import Badge from "@material-ui/core/Badge";
import Resizer from "react-image-file-resizer";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";

const langs = ISO6391.getLanguages(ISO6391.getAllCodes());
const languageLevelMarks = [
  {
    value: 0,
    label: "A1",
  },
  {
    value: 1,
    label: "A2",
  },
  {
    value: 2,
    label: "B1",
  },
  {
    value: 3,
    label: "B2",
  },
  {
    value: 4,
    label: "C1",
  },
  {
    value: 5,
    label: "C2",
  },
];
const getFullUserLanguageList = (userLangs) =>
  langs.map((lang) => {
    let result = { key: lang.code, value: lang.code, text: lang.nativeName };
    let userLang = userLangs.filter((x) => x.code === lang.code)[0];
    if (userLang) {
      result.checked = true;
      result.rate = userLang.level;
    }
    return result;
  });

const getCleanUserLanguageList = (userLangs) =>
  userLangs
    .filter((lang) => lang.checked)
    .map((lang) => {
      return { code: lang.value, level: lang.rate };
    });

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      300,
      300,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

export default function Settings() {
  const [errorMessage, setErrorMessage] = useState();

  const [lang, setLang] = useState(localStorage.getItem("lang"));
  const handleUILangChange = (event) => {
    let value = event.target.value;
    setLang(value);
    localStorage.setItem("lang", event.target.value);
  };

  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  const handleThemeChange = (event) => {
    let value = event.target.value;
    setTheme(value);
    localStorage.setItem("theme", value);
  };

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState();
  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      const result = await userService.getUserAsync();
      setUser(result);
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      setLanguagesToLearn(user.languagesToLearn);
      setLanguagesToTeach(user.languagesToTeach);
      setProfilePictureUrl(user.profilePictureUrl);
    }
  }, [user]);

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const bioRef = useRef();

  const [languagesToLearn, setLanguagesToLearn] = useState([]);
  const handleLangsToLearnApply = (value) =>
    setLanguagesToLearn(getCleanUserLanguageList(value));

  const [languagesToTeach, setLanguagesToTeach] = useState([]);
  const handleLangsToTeachApply = (value) =>
    setLanguagesToTeach(getCleanUserLanguageList(value));

  const [profilePictureUrl, setProfilePictureUrl] = useState();
  function handleProfileImageChange(imageList) {
    resizeFile(imageList[0].file)
      .then((resizedDataUrl) => setProfilePictureUrl(resizedDataUrl))
      .catch((error) => {
        console.log(error);
        setErrorMessage(i18n.somethingWentWrong);
      });
  }

  function handleProfileSettingsSaveClick() {
    let userToSave = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      bio: bioRef.current.value,
      languagesToLearn,
      languagesToTeach,
      profilePictureUrl
    };
    if (!userToSave.firstName) {
      setErrorMessage(`${i18n.firstName} ${i18n.isRequired}`);
      return;
    }
    if (!userToSave.lastName) {
      setErrorMessage(`${i18n.lastName} ${i18n.isRequired}`);
      return;
    }
    setIsLoading(true);
    userService
      .updateUserAsync(userToSave)
      .then((user) => setUser(user))
      .catch(() => setErrorMessage(i18n.failedToSaveData))
      .then(() => setIsLoading(false));
  }

  function handleLogOutClick() {
    accountService.logout();
    window.location.reload();
  }

  const i18n = useI18n();

  return (
    <div className="settings">
      <div className="setting-group">
        <p className="setting-group-header">{i18n.profileSettings}:</p>
        {isLoading ? (
          <>
            <div>
              <Skeleton variant="circle" height="75px" width="75px" />
              <Skeleton variant="text" height="80px" />
            </div>
            <Skeleton variant="text" height="48px" />
            <Skeleton variant="text" height="48px" />
            <Skeleton variant="text" height="16px" />
            <Skeleton variant="text" height="48px" />
            <Skeleton variant="text" height="16px" />
            <Skeleton variant="text" height="48px" />
            <Skeleton variant="text" height="48px" />
          </>
        ) : (
          <>
            {errorMessage ? (
              <><Alert severity="error">{errorMessage}</Alert><br/></>
            ) : null}
            <ImageUploading
              onChange={handleProfileImageChange}
              maxNumber={1}
              dataURLKey="data_url"
            >
              {({ onImageUpload }) => (
                <div className="user-profile-image-wrapper">
                  <Badge
                    overlap="circle"
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    badgeContent={
                      <IconButton
                        onClick={() => setProfilePictureUrl(null)}
                        size="small"
                      >
                        <HighlightOffRoundedIcon />
                      </IconButton>
                    }
                  >
                    <Avatar
                      className="user-profile-image"
                      onClick={onImageUpload}
                      alt={`${user.firstName} ${user.lastName}`}
                      src={profilePictureUrl}
                    />
                  </Badge>
                  <TextField
                    multiline
                    max-rows={3}
                    rows={3}
                    className="column-input"
                    defaultValue={user.bio}
                    inputRef={bioRef}
                    label={i18n.aFewWordsAboutYou}
                  />
                </div>
              )}
            </ImageUploading>
            <TextField
              required
              className="row-input"
              defaultValue={user.firstName}
              inputRef={firstNameRef}
              label={i18n.firstName}
            />
            <TextField
              required
              className="row-input"
              defaultValue={user.lastName}
              inputRef={lastNameRef}
              label={i18n.lastName}
            />
            <RateableCheckboxListInput
              className="row-input"
              items={getFullUserLanguageList(languagesToLearn)}
              label={i18n.languagesToLearn}
              marks={languageLevelMarks}
              onApply={handleLangsToLearnApply}
            />
            <RateableCheckboxListInput
              className="row-input"
              items={getFullUserLanguageList(languagesToTeach)}
              label={i18n.languagesToTeach}
              marks={languageLevelMarks}
              onApply={handleLangsToTeachApply}
            />
            <br />
            <Button
              onClick={handleProfileSettingsSaveClick}
              variant="contained"
              color="primary"
            >
              {i18n.save}
            </Button>
          </>
        )}
      </div>
      <div className="setting-group">
        <p className="setting-group-header">{i18n.applicationSettings}:</p>
        <Alert severity="info">
          {i18n.changesWillBeAppliedAfterPageReload}
        </Alert>
        <br />
        <FormControl component="fieldset">
          <FormLabel component="legend">{i18n.colorScheme}</FormLabel>
          <RadioGroup
            aria-label="theme"
            name="theme"
            value={theme}
            onChange={handleThemeChange}
          >
            <FormControlLabel
              value="light"
              control={<Radio color="primary" />}
              label={
                <span className="theme-label">
                  <Brightness7></Brightness7>
                  {i18n.light}
                </span>
              }
            />
            <FormControlLabel
              value="dark"
              control={<Radio color="primary" />}
              label={
                <span className="theme-label">
                  <NightsStay></NightsStay>
                  {i18n.dark}
                </span>
              }
            />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <InputLabel id="ui-lang-label">{i18n.interfaceLanguage}</InputLabel>
          <Select
            labelId="ui-lang-label"
            value={lang}
            onChange={handleUILangChange}
          >
            {langs
              .filter((lang) =>
                i18nService.availableLocales.includes(lang.code)
              )
              .map((lang) => (
                <MenuItem key={lang.code} value={lang.code}>
                  {lang.nativeName}
                </MenuItem>
              ))}
          </Select>
          <br />
          <Button
            onClick={handleLogOutClick}
            size="small"
            variant="outlined"
            endIcon={<ExitToApp />}
          >
            {i18n.singOut}
          </Button>
        </FormControl>
      </div>
    </div>
  );
}
