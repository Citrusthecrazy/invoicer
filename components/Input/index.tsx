import React from "react";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export default styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: "10px",
    },
    "&:hover": {
      "& fieldset": {
        border: "1px solid rgba(0,0,0,0.25)",
      },
    },
  },
});
