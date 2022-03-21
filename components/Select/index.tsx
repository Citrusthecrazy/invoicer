import { Select } from "@mui/material";
import { styled } from "@mui/material/styles";

export default styled(Select)({
  borderRadius: "10px",
  "&:hover": {
    "& .MuiOutlinedInput-notchedOutline": {
      border: "1px solid rgba(0,0,0,0.25)",
    },
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "2px solid #6B8CFF",
  },
});
