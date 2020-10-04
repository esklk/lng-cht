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
import React from "react";
import { Autocomplete, Alert } from "@material-ui/lab";
import "./Settings.css";
import ISO6391 from "iso-639-1";
import { accountService } from "../Services/accountService";
import RateableCheckbox from "../Components/RateableCheckbox";
import RateableLanguageInfoList from "../Components/RateableLanguageInfoList";

export default function Settings() {
  const [lang, setLang] = React.useState(localStorage.getItem("lang"));
  const handleUILangChange = (event) => {
    let value = event.target.value;
    setLang(value);
    localStorage.setItem("lang", event.target.value);
  };

  const [theme, setTheme] = React.useState(localStorage.getItem("theme"));
  const handleThemeChange = (event) => {
    let value = event.target.value;
    setTheme(value);
    localStorage.setItem("theme", value);
  };

  const langs = ISO6391.getLanguages(ISO6391.getAllCodes());
  const user = accountService.currentUserValue.account;

  const getFullUserLanguageList = (userLangs) =>
    langs.map((lang) => {
      let userLang = userLangs.filter((x) => x.code === lang.code)[0];
      if (userLang) {
        lang.checked = true;
        lang.rate = userLang.level;
      }
      return lang;
    });

  const langsToLearn = getFullUserLanguageList(user.languagesToLearn);
  const langsToTeach = getFullUserLanguageList(user.languagesToTeach);

  return (
    <div className="settings">
      <div className="setting-group">
        <p className="setting-group-header">Profile settings:</p>
        <TextField required value={user.firstName} label="First Name" />
        <TextField required value={user.lastName} label="Last Name" />
        <br/>
        {/* This components slows down page loading. Think about control to select languages. */}
        <RateableLanguageInfoList languages={langsToTeach} label="Languages to Teach"/>
        <RateableLanguageInfoList languages={langsToLearn} label="Languages to Learn" />
        <br />
        <Button variant="contained" color="primary">
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
