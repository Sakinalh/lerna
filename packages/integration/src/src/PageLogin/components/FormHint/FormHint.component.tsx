import styled from "styled-components";
import { withTheme } from "@mui/styles";

export const FormHint = withTheme(styled.p<{ isShowError: boolean }>`
  color: ${props => props.theme.palette.red.light};
  font-size: 13px;
  margin-bottom: 0;
  width: 100%;
  white-space: nowrap;
  min-height: 13px;
  margin-top: 5px;
  opacity: ${props => (props.isShowError ? 1 : 0)};
`);
