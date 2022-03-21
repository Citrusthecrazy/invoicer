import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export default styled(Button)({
  backgroundColor: "#6b8cff",
  borderRadius: "10px",
  "&:hover": {
    backgroundColor: "hwb(227 42% 12%)",
  },
});
