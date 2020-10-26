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
import React, { useState, useRef } from "react";
import { Alert } from "@material-ui/lab";
import "./Settings.css";
import ISO6391 from "iso-639-1";
import { accountService } from "../Services/accountService";
import RateableCheckboxListInput from "../Components/RateableCheckboxListInput";

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
  const userRef = useRef(accountService.currentUserValue.account);
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

  const [firstName, setFirstName] = useState(userRef.current.firstName);
  const handleUserFirstNameChange = (event) => {
    let value = event.target.value;
    setFirstName(value);
  };

  const [lastName, setLastName] = useState(userRef.current.lastName);
  const handleUserLastNameChange = (event) => {
    let value = event.target.value;
    setLastName(value);
  };

  const [languagesToLearn, setLanguagesToLearn] = useState(
    userRef.current.languagesToLearn
  );
  const handleLangsToLearnApply = (value) =>
    setLanguagesToLearn(getCleanUserLanguageList(value));

  const [languagesToTeach, setLanguagesToTeach] = useState(
    userRef.current.languagesToTeach
  );
  const handleLangsToTeachApply = (value) =>
    setLanguagesToTeach(getCleanUserLanguageList(value));

  function handleProfileSettingsSaveClick() {
    let userToSave = {
      id: userRef.current.userId,
      email: userRef.current.email,
      firstName,
      lastName,
      languagesToLearn,
      languagesToTeach,
    };
    //TODO: send user to server to save
    console.log(userToSave);
  }

  return (
    <div className="settings">
      <div className="setting-group">
        <p className="setting-group-header">Profile settings:</p>
        <TextField
          required
          value={firstName}
          onChange={handleUserFirstNameChange}
          label="First Name"
        />
        <TextField
          required
          value={lastName}
          onChange={handleUserLastNameChange}
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
