import React from "react";
import styled from "styled-components";
import { Button } from "@mui/material";

export default styled(Button)`
  background-color: #432356;
  &:disabled {
    color: white;
    background-color: blue;
    height: 80px;
  }
  &:hover {
    background: red;
  }
`;
