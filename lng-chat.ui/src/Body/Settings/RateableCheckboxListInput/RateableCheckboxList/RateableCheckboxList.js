import { FormLabel } from "@material-ui/core";
import React from "react";
import RateableCheckbox from "./RateableCheckbox/RateableCheckbox";

export default function RateableCheckboxList({
  items,
  label,
  marks,
  onChange,
}) {
  const itemsDict = React.useRef(
    createItemsDict(JSON.parse(JSON.stringify(items)))
  );

  const handleRateableCheckboxChange = (value, checked, rate) => {
    itemsDict.current[value].checked = checked;
    itemsDict.current[value].rate = checked ? rate : marks[0].value;
    if (onChange) {
      onChange(Object.values(itemsDict.current));
    }
  };

  let labelElement = label ? (
    <FormLabel component="legend">{label}</FormLabel>
  ) : null;

  return(
    <div>
      {labelElement}
      <div>
        {Object.values(itemsDict.current)
          .sort((a, b) =>
            a.checked === b.checked ? 0 : a.checked === true ? -1 : 1
          )
          .map((item) => (
            <RateableCheckbox
              key={item.key}
              value={item.value}
              text={item.text}
              checked={item.checked}
              rate={item.rate}
              marks={marks}
              onChange={handleRateableCheckboxChange}
            />
          ))}
      </div>
    </div>
  );
}

function createItemsDict(items) {
  let dict = {};
  items.forEach((item) => (dict[item.value] = item));
  return dict;
}
