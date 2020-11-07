import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import RateableCheckboxList from "./RateableCheckboxList/RateableCheckboxList";
import { FormLabel } from "@material-ui/core";
import "./RateableCheckboxListInput.css";

export default function RateableCheckboxListInput({
  items,
  label,
  marks,
  onApply,
  className,
}) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCancelClick = () => {
    setOpen(false);
  };
  const handleOkClick = () => {
    setOpen(false);
    onApply(valuesRef.current);
  };

  const valuesRef = React.useRef(null);
  const handleRateableCheckboxListChanged = (values) => {
    valuesRef.current = values;
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  let labelElement = label ? (
    <FormLabel component="legend">{label}</FormLabel>
  ) : null;

  return (
    <div className={className}>
      {labelElement}
      <Button className="rcli-button" onClick={handleClickOpen}>
        <span className="rcli-button-text">
          {items
            .filter((item) => item.checked)
            .map(
              (item) =>
                `${item.text} - ${
                  marks.find((mark) => mark.value === item.rate).label
                }`
            )
            .join("; ") || "No language selected"}
        </span>
      </Button>
      <Dialog
        open={open}
        onClose={handleCancelClick}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{label}</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContent
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <RateableCheckboxList
              items={items}
              marks={marks}
              onChange={handleRateableCheckboxListChanged}
            />
          </DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelClick}>Cancel</Button>
          <Button onClick={handleOkClick}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
