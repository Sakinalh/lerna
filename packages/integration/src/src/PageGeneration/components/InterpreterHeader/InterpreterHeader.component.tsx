import { Button, Menu, MenuItem } from "src/deps";
import makeStyles from "@mui/styles/makeStyles";
import { MouseEvent as ReactMouseEvent, useState } from "react";
import { AppLink } from "src/components/AppLink/AppLink";
import { ArrowBack, ArrowDropUp, DesktopWindowsOutlined } from "@mui/icons-material";
import * as TRANSLATE from "src/shared/translation/en.json";
import { FormState, StoreState, TemplateRuleStateInterface } from "src/model";
import { useDispatch, useSelector } from "react-redux";
import { AppBtnLink } from "src/components/AppBtnLink/AppBtnLink.component";
import { AppText } from "src/components/AppText/AppText.component";
import { AppBtn } from "src/components/AppBtn/AppBtn.component";
import { denormalizeRulePayload, getInterpreterRouteParams } from "../../shared/helper";
import { tryPostRuleDetailAction, tryPutRuleDetailAction } from "../../store/rule.epic";

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: theme.shape.objectShadow.boxShadowAll,
    backgroundColor: theme.palette.white
  },
  actions: {
    width: "25%",
    display: "flex",
    justifyContent: "space-evenly"
  },
  btn: {
    "&:nth-child(2)": {
      color: "#FBFBFB"
    }
  },
  labelBtn: {
    display: "flex",
    alignItems: "center"
  },
  btnIcon: {
    verticalAlign: "sub"
  },
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: theme.shape.border.solidGrey,
    padding: "15px 30px 15px 30px"
  },
  icon_wrap: {
    display: "flex",
    alignItems: "center",
    color: theme.palette.grey.middle2,
    padding: "0 5px 0 0"
  },
  iconMedia: {
    paddingRight: "5px",
    fontSize: "1.4em"
  },
  link: {
    display: "flex",
    alignItems: "center",
    color: theme.palette.blue.main,
    textDecoration: "underline"
  },
  disable: {
    pointerEvents: "none",
    color: theme.palette.white,
    backgroundColor: theme.palette.grey.middle2,
    opacity: "20%",
    padding: "4px 10px"
  }
}));

function getBtnLabel(state: FormState, defaultValue: string) {
  const BTN_LABEL = {
    idle: defaultValue,
    valid: defaultValue,
    invalid: defaultValue,
    pending: "loading",
    success: "saved",
    error: "error"
  };

  return BTN_LABEL[state];
}

interface InterpreterHeaderProps {}

export function InterpreterHeader(_props: InterpreterHeaderProps): JSX.Element {
  const classes = useStyles({});
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { datum }: TemplateRuleStateInterface = useSelector(
    (state: StoreState) => state.ruleDetail.rule
  );

  const { formState } = useSelector<FormState>(
    (state: StoreState) => state.ruleDetail
  );

  const {
    ruleId,
    templateId
  } = getInterpreterRouteParams(window.location.pathname);

  const dispatch = useDispatch();

  function handleClick(event: ReactMouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleCreate(_e: ReactMouseEvent<HTMLLIElement>) {
    dispatch(tryPostRuleDetailAction({ datum: denormalizeRulePayload(datum), id: templateId.toString() }));
    handleClose();
  }

  function handleUpdate(_e: ReactMouseEvent<HTMLLIElement>) {
    dispatch(tryPutRuleDetailAction({ datum: denormalizeRulePayload(datum), id: ruleId as number }));
    handleClose();
  }

  return (

    <ul className={classes.root}>
      <li className={classes.nav}>
        <AppLink path="/generation/template/list/"
          label={TRANSLATE.btn.back}
          iconBefore={<ArrowBack/>}
          rootClass={classes.link}/>
      </li>
      <li className={classes.nav}>

        <div className={classes.icon_wrap}>
          <DesktopWindowsOutlined className={classes.iconMedia}/>
          <AppText text={TRANSLATE.device.desktop}
            themeColor="neutralColor"
          />
        </div>

        <div className={classes.actions}>
          <AppBtn variant="outlined"
            id="save_rules"
            size="small"
            color="secondary"
            aria-haspopup="true"
            onClick={handleClick}
            endIcon={<ArrowDropUp />}
            classes={{
              root: classes.btn,
              label: classes.labelBtn
            }}
            arrow

          >
            {getBtnLabel(formState, TRANSLATE.btn.save)}
          </AppBtn>

          <Menu
            id="rule-action"
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={handleCreate}>
              {TRANSLATE.interpreterHeader.new}
            </MenuItem>
            <MenuItem disabled={ruleId === "create"}
              onClick={handleUpdate}>
              {TRANSLATE.interpreterHeader.erase}
            </MenuItem>
            <MenuItem
              onClick={handleClose}>
              {TRANSLATE.interpreterHeader.cancel}
            </MenuItem>
          </Menu>

          <AppBtnLink uri={`/generation/template/${templateId}/rule/${ruleId}/keywords/`}
            overrideClasses={ruleId === "create" ? classes.disable : {}}
            label={TRANSLATE.btn.link}/>
        </div>

      </li>
    </ul>

  );
}
