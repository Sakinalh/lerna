import { Button, useTheme } from "@mui/material";
import styled from "styled-components";

const theme = useTheme();

export const FormSubmitBtn = styled(Button)(({ theme }) => (`
  color: ${theme.palette.white}
  background-color: ${({ content }) => content === "Error" ? theme.palette.red : theme.palette.blue.main};
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  &:after {
    content: '${({ content }) => content }'
  },
  &:hover {
    background-color:${({ content }) => content === "Error" ? "#D69F9C" : "#397EF5"}};
  }
`));
