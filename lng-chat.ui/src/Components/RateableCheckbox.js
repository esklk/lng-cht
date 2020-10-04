import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Slider } from "@material-ui/core";

const marks = [
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

function valuetext(value) {
  //return value;
}

export default function RateableCheckbox({
  value,
  text,
  checked,
  rate,
  onChange,
}) {
  const [checkboxValue, setCheckboxValue] = React.useState(checked);
  const handleCheckStateChange = (event) => {
    setCheckboxValue(event.target.checked);
    onChange(value, checkboxValue);
  };
  const handleRateChange = (event, newValue) => {
    onChange(value, checkboxValue, newValue);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        paddingRight: "15px",
      }}
    >
      <FormControlLabel
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
        defaultValue={rate}
        getAriaValueText={valuetext}
        valueLabelDisplay="off"
        onChangeCommitted={handleRateChange}
        disabled={!checkboxValue}
        step={1}
        marks={marks}
        min={0}
        max={5}
      />
    </div>
  );
}
