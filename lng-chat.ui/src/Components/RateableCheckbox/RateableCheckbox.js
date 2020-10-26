import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Slider } from "@material-ui/core";
import "./RateableCheckbox.css";

function valuetext(value) {
  //return value;
}

export default function RateableCheckbox({
  value,
  text,
  checked,
  rate,
  marks,
  onChange,
}) {
  const [checkboxValue, setCheckboxValue] = React.useState(checked);
  const handleCheckStateChange = (event) => {
    setCheckboxValue(event.target.checked);
    if (onChange) {
      onChange(value, event.target.checked, 0);
    }
  };
  const handleRateChange = (event, newValue) => {
    if (onChange) {
      onChange(value, checkboxValue, newValue);
    }
  };

  return (
    <div className="rateable-checkbox-wrapper">
      <FormControlLabel
        className="checkbox"
        label={text}
        control={
          <Checkbox
            checked={checkboxValue}
            onChange={handleCheckStateChange}
            color="primary"
          />
        }
      />
      <Slider
        className="rater"
        defaultValue={rate}
        getAriaValueText={valuetext}
        valueLabelDisplay="off"
        onChangeCommitted={handleRateChange}
        disabled={!checkboxValue}
        step={1}
        marks={marks}
        min={marks[0].value}
        max={marks[marks.length - 1].value}
      />
    </div>
  );
}
