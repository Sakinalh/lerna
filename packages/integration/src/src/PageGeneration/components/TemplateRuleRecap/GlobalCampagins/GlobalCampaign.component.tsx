import * as React from "react";
import { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { StoreState } from "src/model";
import { useDispatch, useSelector } from "react-redux";
import { TemplateRuleNormalizedApi } from "src/PageGeneration/model";
import { AppFormGroup } from "src/components/AppFormGroup/AppFormGroup.component";
import produce from "immer";
import { UtmGroupFormInterface } from "src/shared/form";
import { patchRuleUtmAction } from "src/PageGeneration/store/rule.epic";
import { AppText } from "src/components/AppText/AppText.component";
import clsx from "clsx";
import { UtmValueForm } from "../../InterpreterTools/UtmActions/UtmValueForm/UtmValueForm.component";
import {
  parseUtmForm,
  UtmFormInterface
} from "../../InterpreterTools/UtmActions/UtmActionForm/UtmActionForm.component";

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.grey.light

  },
  url: {
    border: `solid 1px ${theme.palette.grey.light}`,
    borderRadius: 3,
    margin: "10px 0"

  },
  utm: {
    border: `solid 1px ${theme.palette.grey.light}`,
    borderRadius: 3,
    overflowY: "auto",
    maxHeight: 120
  },
  item: {
    display: "grid",
    gridTemplateColumns: "40% 60%",
    alignItems: "center",
    borderRadius: 5,
    padding: 30
  },
  inputLabel: {
    opacity: "50%"
  },
  text: {

    fontSize: 14
  },
  textColor: {
    textAlign: "left",
    position: "relative"
  },
  hideBorder: {
    border: "none"
  }
}));

interface GlobalCampaignProps {}

export function GlobalCampaign(props: GlobalCampaignProps): JSX.Element {
  const classes = useStyles(props);
  const dispatch = useDispatch();

  const {
    url_pattern,
    utm
  }: Pick<TemplateRuleNormalizedApi, "url_pattern" | "utm"> = useSelector((state: StoreState) => state.ruleDetail.rule.datum);

  const [form, setForm] = useState<UtmFormInterface>(() => parseUtmForm({ url_pattern, utm }, true));

  useEffect(() => {
    setForm(
      parseUtmForm({ url_pattern, utm }, false)
    );
  }, [url_pattern, utm]);

  function handleFormGroupChange(payload: Partial<UtmFormInterface>) {
    const update = { ...form, ...payload };

    dispatch(patchRuleUtmAction(
      {
        utm: update.utm.map(f => f.getValue()),
        url_pattern: update.url_pattern.getValue()
      }
    ));
  }

  function handleItemUpdate(idx: number) {
    // eslint-disable-next-line
    return function (value: UtmGroupFormInterface) {
      const _upForm = produce(form, (draftState) => {
        draftState.utm[idx] = value;
      });
      dispatch(patchRuleUtmAction({
        utm: _upForm.utm.map(f => f.getValue()),
        url_pattern: _upForm.url_pattern.getValue()
      }));
    };
  }

  return (
    <div className={classes.root}>
      <div className={classes.url}>
        <div className={classes.item}>
          <AppText props={{ classes: { root: classes.text } }}
            text="URL Pattern"
            themeColor="initial"
          />
          <div>
            <AppFormGroup
              inputKey="url_pattern"
              inputState={form.url_pattern}
              formGroupChange={handleFormGroupChange}
              inputProps={{
                "aria-describedby": "url pattern"
              }}
              customValidations={["required"]}
              overrideClass={{
                input: classes.inputLabel
              }}
            />
          </div>

        </div>
      </div>
      <div className={clsx(classes.utm, { [classes.hideBorder]: form.utm.length === 0 })}>
        {
          form.utm.map((f, idx) => <UtmValueForm
              key={`utm_key_${idx}`}
              datum={f}
              onUpdate={handleItemUpdate(idx)}
            />)
        }
      </div>

    </div>
  );
}
