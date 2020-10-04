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

export default function Settings() {
  const handleUILangChange = (event) => {
    //TODO: set localstorage lang
  };
  const handleThemeChange = (event) => {
    //TODO: set localsorage theme
  };

  const langs = ISO6391.getLanguages(ISO6391.getAllCodes());

  return (
    <div className="settings">
      <div className="setting-group">
        <p>Profile settings:</p>
        <TextField required label="First Name" />
        <TextField required label="Last Name" />
        <Autocomplete
          multiple
          options={langs}
          getOptionLabel={(option) => option.nativeName}
          defaultValue={[]}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Languages to Learn"
            />
          )}
        />
        <Autocomplete
          multiple
          options={langs}
          getOptionLabel={(option) => option.nativeName}
          defaultValue={[]}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Languages to Teach"
            />
          )}
        />
        <br />
        <Button variant="contained" color="primary">
          Save
        </Button>
      </div>
      <div className="setting-group">
        <p>Application Settings:</p>
        <Alert severity="info">
          Changes will be applied after page reload.
        </Alert>
        <br />
        <FormControl component="fieldset">
          <FormLabel component="legend">Color Scheme</FormLabel>
          <RadioGroup
            aria-label="theme"
            name="theme"
            value={localStorage.getItem("theme")}
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
            value={localStorage.getItem("lang")}
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
