import {
  Dialog,
  FormControl,
  Grid,
  InputLabel,
  TextField,
  Tooltip,
  Typography
} from "@mui/material";
import clsx from "clsx";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import React, { useState } from "react";
import { Slider } from "src/deps";
import { createNewCampaignTest, setCampiagnTestByKeywordAction, tryCreateCampaignTest } from "src/PageGeneration/store/actions";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { AppTooltip } from "src/components";
import { AppCalendar } from "../../../components/AppCalendar/AppCalendar.component";
import { AppBtn } from "../../../components/AppBtn/AppBtn.component";
import { useStyles } from "./CampaignModal.style";

export interface CampaignModalProps {
  payload: any;
  onCloseLinkToCampaign: any;
  setActiveStep: any;
  setTxt: any;
}
function valueLabelFormat(value) {
  return value + "%";
}

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <AppTooltip arrow open={open} enterTouchDelay={0} placement="top" title={<div className="tooltip__container">{value}</div>}>
      {children}
    </AppTooltip>
  );
}

export interface IFormInput {
  name: string;
  start_date: any;
  end_date: any;
  traffic_split: string;

}

export function CampaignModal(props: CampaignModalProps) {
  const { payload, onCloseLinkToCampaign, setActiveStep, setTxt } = props;
  const classes = useStyles({});
  const dispatch = useDispatch();
  const [campaignName, setCampaignName] = useState("");
  const [minDate, setMinDate] = useState(null);

  const { handleSubmit, formState, control, register, getValues, setValue } = useForm<IFormInput>({
    mode: "onBlur",
    defaultValues: { start_date: dayjs(), end_date: dayjs().add(3, "days"), traffic_split: "50" }
  });

  const { isSubmitting, isValid, errors, isDirty } = formState;

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    onCreate({ ...payload, ...data });
  };

  const onCreate = (data) => {
    dispatch(tryCreateCampaignTest(data));
    setActiveStep(1);
    setTxt("your test campaign is being created.");
  };
  const onSetDateStart = (_date, onChangeCb) => {
    const date = dayjs(_date);
    const minDate = date.add(3, "days");
    const endDate = getValues("end_date");

    if(date > endDate) {
      setValue("end_date", minDate);
    }

    if(endDate < minDate) {
      setValue("end_date", minDate);
    }

    setMinDate(minDate);

    onChangeCb(date);
  };

  const onSetDateEnd = (date, onChangeCb) => {
    setValue("end_date", date);
    setMinDate(minDate);

    onChangeCb(date);
  };

  const handleChangSplit = onChangeCb => (event, newValue) => {
    setValue("traffic_split", newValue);
    onChangeCb(newValue);
  };

  return (
    <div
      classes={{
        paper: `${classes.dialog} dialog--paper`
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={clsx("campaignModal__body container__body")}>

          <Typography className="campaignModal__title" variant="h1">Create test campaign</Typography>
          <p className="campaignModal__subTitle">
            We did not find the test campaign.
          </p>

          <p className="campaignModal__txt">
            No worries! you can create a new test campaign
          </p>

          <FormControl className="campaignModal__groupInput" fullWidth={true} variant="outlined">
            <TextField
              name='name'
              {...register("name", { required: true })}
              defaultValue={campaignName}
              onChange={e => setCampaignName(e.target.value)}
              helperText={errors.name && errors.name.message || ""}
              error={errors.name && errors.name.type === "required"}
              FormHelperTextProps={{
                classes: { root: "error" }
              }}
              label={"Campaign Name"}
              placeholder="[Test] Disney winter campaign"
              id="campaignName"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
                classes: {
                  root: "label--simple"
                }
              }}
              InputProps={{
                classes: {
                  root: "input input__outline--root",
                  focused: "input input__outline--focused",
                  disabled: "input input__outline--disabled"
                }
              }}
            />
          </FormControl>

          <FormControl
            className="campaignModal__groupInput campaignModal__groupInput--inline "
            variant="outlined"
          >

            <div>
              <h2 className="label--simple">
                Start Date
              </h2>
              <Controller
                name="start_date"
                control={control}
                render={({ field: { onChange, value } }) => <AppCalendar
                  {...register("start_date", { required: false })}
                  value={value}
                  handleDateChange={data => onSetDateStart(data, onChange)}
                />}
              />
            </div>

            <div>
              <h2 className="label--simple">
                End Date
              </h2>
              <Controller
                name="end_date"
                control={control}
                render={({ field: { onChange, value } }) => <AppCalendar
                {...register("end_date", { required: false })}
                value={value}
                minDate={minDate}
                handleDateChange={data => onSetDateEnd(data, onChange)} />}
              />
            </div>

          </FormControl>

          <h2 className="label--simple">
            Split traffic
          </h2>

          <Controller
            name="traffic_split"
            control={control}
            render={({ field: { onChange, value } }) => <Slider
              {...register("traffic_split", { required: false })}
              value={value}
              onChange={handleChangSplit(onChange)}
              min={0}
              step={1}
              max={100}
              ValueLabelComponent={ValueLabelComponent}
              getAriaValueText={valueLabelFormat}
              valueLabelFormat={valueLabelFormat}
              valueLabelDisplay="on"
              aria-labelledby="non-linear-slider"
            />}
          />

        </div>
        <footer className="campaignModal__footer container__footer">
          <Grid
            className="container__btns"
            container
            justifyContent="flex-end"
            alignItems="center"
          >
            <AppBtn onClick={onCloseLinkToCampaign} typeBtn="customSimple">Cancel</AppBtn>
            <AppBtn disabled={!isValid} type={"submit"} typeBtn="customPrimary">
              Create Test Campaing
            </AppBtn>
          </Grid>
        </footer>
      </form>

    </div>
  );
}
