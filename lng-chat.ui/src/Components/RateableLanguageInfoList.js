import { FormControlLabel } from "@material-ui/core";
import React from "react";
import RateableCheckbox from "./RateableCheckbox";

export default function RateableLanguageInfoList({
  languages,
  label,
  onChange,
}) {
  const onRateableCheckboxChange = (value, checked, rate) => {
    //TODO: trigger onChange
  };

  return (
    <div>
      <span className="MuiTypography-root MuiFormControlLabel-label MuiTypography-body1">{label}</span>
      <div style={{ maxHeight: "200px", overflow: "auto" }}>
        {languages.map((lang) => (
          <RateableCheckbox
            key={lang.code}
            value={lang.code}
            text={lang.nativeName}
            checked={lang.checked}
            rate={lang.rate}
            onChange={onRateableCheckboxChange}
          />
        ))}
      </div>
    </div>
  );
}
