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
} from "@material-ui/core";
import React, { useState, useRef, useEffect, Fragment } from "react";
import { Alert, Skeleton } from "@material-ui/lab";
import "./Settings.css";
import ISO6391 from "iso-639-1";
import RateableCheckboxListInput from "../Components/RateableCheckboxListInput";
import { userService } from "../Services/userService";

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

export default function Settings() {
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
    }
  }, [user]);

  const firstNameRef = useRef();
  const lastNameRef = useRef();

  const [languagesToLearn, setLanguagesToLearn] = useState([]);
  const handleLangsToLearnApply = (value) =>
    setLanguagesToLearn(getCleanUserLanguageList(value));

  const [languagesToTeach, setLanguagesToTeach] = useState([]);
  const handleLangsToTeachApply = (value) =>
    setLanguagesToTeach(getCleanUserLanguageList(value));

  function handleProfileSettingsSaveClick() {
    let userToSave = {
      id: user.userId,
      email: user.email,
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      languagesToLearn,
      languagesToTeach,
    };
    console.log(userToSave);
    setIsLoading(true);
    userService.updateUserAsync(userToSave).then((x) => setIsLoading(false));
  }

  return (
    <div className="settings">
      <div className="setting-group">
        <p className="setting-group-header">Profile settings:</p>
        {isLoading ? (
          <Fragment>
            <Skeleton variant="text" height="48px" />
            <Skeleton variant="text" height="48px" />
            <Skeleton variant="text" height="16px" />
            <Skeleton variant="text" height="48px" />
            <Skeleton variant="text" height="16px" />
            <Skeleton variant="text" height="48px" />
            <br />
            <Skeleton variant="text" height="48px" />
          </Fragment>
        ) : (
          <Fragment>
            <TextField
              required
              defaultValue={user.firstName}
              inputRef={firstNameRef}
              label="First Name"
            />
            <TextField
              required
              defaultValue={user.lastName}
              inputRef={lastNameRef}
              label="Last Name"
            />
            <br />
            <RateableCheckboxListInput
              items={getFullUserLanguageList(languagesToLearn)}
              label="Languages to Learn"
              marks={languageLevelMarks}
              onApply={handleLangsToLearnApply}
            />
            <RateableCheckboxListInput
              items={getFullUserLanguageList(languagesToTeach)}
              label="Languages to Teach"
              marks={languageLevelMarks}
              onApply={handleLangsToTeachApply}
            />
            <br />
            <Button
              onClick={handleProfileSettingsSaveClick}
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </Fragment>
        )}
      </div>
      <div className="setting-group">
        <p className="setting-group-header">Application Settings:</p>
        <Alert severity="info">
          Changes will be applied after page reload.
        </Alert>
        <br />
        <FormControl component="fieldset">
          <FormLabel component="legend">Color Scheme</FormLabel>
          <RadioGroup
            aria-label="theme"
            name="theme"
            value={theme}
            onChange={handleThemeChange}
          >
            <FormControlLabel
              value="light"
              control={<Radio color="primary" />}
              label="Light"
            />
            <FormControlLabel
              value="dark"
              control={<Radio color="primary" />}
              label="Dark"
            />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <InputLabel id="ui-lang-label">Interface language</InputLabel>
          <Select
            labelId="ui-lang-label"
            value={lang}
            onChange={handleUILangChange}
          >
            {langs.map((lang) => (
              <MenuItem key={lang.code} value={lang.code}>
                {lang.nativeName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
