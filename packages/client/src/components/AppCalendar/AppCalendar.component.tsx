// @ts-nocheck
import { createTheme } from "@mui/material/styles";
import { Theme } from "@mui/styles";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { useStyles } from "./AppCalendar.style";
declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}
export interface AppCalendarProps {
    value: any;
    handleDateChange: any;
    disabled?: boolean;
    minDate?: any;
    maxDate?: any;
}

export const AppCalendar = (props) => {
  const classes = useStyles();
  const { value, handleDateChange, disabled = false, ...rest } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
                classes={classes}
                renderInput={params => <TextField {...params} />}
                {...rest}
                disableCloseOnSelect={false}
                shouldDisableDate={currentDate => props.minDate ? currentDate < props.minDate : false}
                // ToolbarComponent= {CustomToolbar}
                showToolbar={true}
                cancelLabel='Cancel'
                okText='Ok'
                inputFormat='dd/MM/yyyy'
                showToolbar={false}
                disableMaskedInput={true}
                onChange={handleDateChange}
                value={value}
                disablePast={false}
                disableFuture={false}
                showDaysOutsideCurrentMonth={true}
            />
    </LocalizationProvider>
  );
};