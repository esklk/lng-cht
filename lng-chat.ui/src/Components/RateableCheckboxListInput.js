import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import RateableCheckboxList from "./RateableCheckboxList";
import { FormLabel } from "@material-ui/core";

export default function RateableCheckboxListInput({
  items,
  label,
  marks,
  onApply,
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
    <div>
      {labelElement}
      <Button
        onClick={handleClickOpen}
        style={{ width: "100%", overflow: "hidden" }}
      >
        {items
          .filter((item) => item.checked)
          .map(
            (item) =>
              `${item.text} - ${
                marks.find((mark) => mark.value === item.rate).label
              }`
          )
          .join("; ") || "No language selected"}
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
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <RateableCheckboxList
              items={items}
              marks={marks}
              onChange={handleRateableCheckboxListChanged}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelClick}>Cancel</Button>
          <Button onClick={handleOkClick}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
